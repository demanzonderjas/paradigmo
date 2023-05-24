import { action, makeAutoObservable } from "mobx";
import { firebaseApp } from "../config/database";
import { createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

export class Database {
	firebase: any = null;
	database: any = null;
	ui: any = null;
	user: any = null;

	constructor() {
		this.firebase = firebaseApp;
		this.database = firebaseApp.database();
		this.listenForUser();
		makeAutoObservable(this, {
			initUI: action.bound,
			addNote: action.bound,
		});
	}

	async listenForUser() {
		firebase.auth().onAuthStateChanged((user: any) => {
			this.user = user;
		});
	}

	async initUI() {
		if (this.user) {
			return;
		}
		const firebaseui = await import("firebaseui");
		this.ui =
			firebaseui.auth.AuthUI.getInstance() ||
			new firebaseui.auth.AuthUI(this.firebase.auth());
		this.ui.start("#firebaseui-auth-container", {
			callbacks: {
				signInSuccessWithAuthResult: function () {
					return true;
				},
				uiShown: function () {
					document.getElementById("loader")!.style.display = "none";
				},
			},
			signInFlow: "popup",
			signInSuccessUrl: "/",
			signInOptions: [
				{
					provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
					signInMethod: firebase.auth.GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
				},
			],
		});
	}

	addNote(note: any) {
		return this.database.ref(`notes/${this.user.uid}`).push(note);
	}
}

export const DatabaseContext = createContext(null);

export const databaseStore = new Database();
