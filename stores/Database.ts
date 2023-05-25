import { action, makeAutoObservable } from "mobx";
import { firebaseApp } from "../config/database";
import { createContext } from "react";
import "firebase/compat/auth";
import "firebase/compat/database";
import { TNote, TTag } from "@/typings/notes";
import { Auth } from "./Auth";

export class Database {
	firebase: any = null;
	database: any = null;
	auth: Auth = null;

	constructor() {
		this.firebase = firebaseApp;
		this.database = firebaseApp.database();
		this.auth = new Auth(this);
		makeAutoObservable(this, {
			addNote: action.bound,
			addTag: action.bound,
			getTagList: action.bound
		});
	}

	async addNote(note: TNote) {
		const noteUid = await this.database.ref(`notes/${this.auth.user.uid}`).push(note).key;
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
