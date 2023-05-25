import { action, makeAutoObservable } from "mobx";
import { firebaseApp } from "../config/database";
import { createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { TNote, TTag } from "@/typings/notes";

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
			addTag: action.bound,
			getTagList: action.bound
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

	async addNote(note: TNote) {
		const noteUid = await this.database.ref(`notes/${this.user.uid}`).push(note).key;
		if(!note.tags) {
			return;
		} 
		return Promise.all(note.tags.map((tag) => this.database.ref(`tags_notes/${tag.uid}/${noteUid}`).set(true)))
	}

	async addTag(name: string): Promise<TTag> {
		const uid = await this.database.ref("tags").push({name}).key;
		return { name, uid }
	}

	async getTagList(): Promise<TTag[]> {
		const tags: { [K in string]: TTag } = await this.database.ref("tags").once("value").then((s: any) => s.val());
		return Object.keys(tags).map((uid) => ({ uid, name: tags[uid].name }));
	}
}

export const DatabaseContext = createContext(null);

export const databaseStore = new Database();
