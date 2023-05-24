import { makeAutoObservable } from "mobx";
import { firebaseApp } from "../config/database";
import { createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export class Database {
	firebase: any = null;
	ui: any = null;

	constructor() {
		this.firebase = firebaseApp;
		this.listenForUser();
		this.initUI();
		makeAutoObservable(this);
	}

	async listenForUser() {
		firebase.auth().onAuthStateChanged((user: any) => {
			if (user) {
				var uid = user.uid;
				console.log(user);
			} else {
			}
		});
	}

	async initUI() {
		const firebaseui = await import("firebaseui");
		this.ui =
			firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
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

	showAuth() {}
}

export const DatabaseContext = createContext(null);

export const databaseStore = new Database();
