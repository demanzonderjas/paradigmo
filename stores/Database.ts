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
			getTagList: action.bound,
			getTag: action.bound,
			getNotesPerTag: action.bound,
			getNote: action.bound,
			updateNote: action.bound,
			getMine: action.bound,
			deleteNote: action.bound,
			setChecked: action.bound,
		});
	}

	async addNote(note: TNote) {
		const noteUid = await this.database.ref(`notes_users`).push(this.auth.user.uid).key;
		await this.database.ref(`notes/${this.auth.user.uid}/${noteUid}`).set(note);
		if (!note.tags) {
			return;
		}
		await Promise.all(
			note.tags.map((tag) => this.database.ref(`tags_notes/${tag.uid}/${noteUid}`).set(true))
		);
		return noteUid;
	}

	async addTag(name: string): Promise<TTag> {
		const uid = await this.database.ref("tags").push({ name }).key;
		return { name, uid };
	}

	async getTagList(): Promise<TTag[]> {
		const tags: { [K in string]: TTag } = await this.database
			.ref("tags")
			.once("value")
			.then((s: any) => s.val());
		return Object.keys(tags || {}).map((uid) => ({ uid, name: tags[uid].name }));
	}

	async getTag(uid: string): Promise<TTag> {
		return this.database
			.ref(`tags/${uid}`)
			.once("value")
			.then((s: any) => s.val());
	}

	async getNotesPerTag(tagUid: string) {
		const noteUids = await this.database
			.ref(`tags_notes/${tagUid}`)
			.once("value")
			.then((s: any) => s.val());
		const notes = await Promise.all(
			Object.keys(noteUids || {}).map((noteUid) =>
				this.database
					.ref(`notes/${this.auth.user.uid}/${noteUid}`)
					.once("value")
					.then((s: any) => ({ ...s.val(), uid: noteUid }))
			)
		);
		return notes;
	}
	async getNote(uid: string): Promise<TNote> {
		const ownerUid = await this.database
			.ref(`notes_users/${uid}`)
			.once("value")
			.then((s: any) => s.val());

		return this.database
			.ref(`notes/${ownerUid}/${uid}`)
			.once("value")
			.then((s: any) => ({ ...s.val(), uid }));
	}

	async updateNote(seed: TNote, note: TNote) {
		await this.database.ref(`notes/${this.auth.user.uid}/${seed.uid}`).set(note);

		const tagsToDelete = (seed.tags || []).filter((_tag) =>
			note.tags.every((tag) => tag.uid !== _tag.uid)
		);

		await Promise.all(
			tagsToDelete.map((tag) =>
				this.database.ref(`tags_notes/${tag.uid}/${seed.uid}`).remove()
			)
		);
		await Promise.all(
			note.tags.map((tag) => this.database.ref(`tags_notes/${tag.uid}/${seed.uid}`).set(true))
		);
	}

	getMine() {
		return this.database
			.ref(`notes/${this.auth.user.uid}`)
			.once("value")
			.then((s: any) => s.val());
	}

	async deleteNote(note: TNote) {
		if (!note.uid) {
			return;
		}
		await Promise.all(
			note.tags.map((tag) => this.database.ref(`tags_notes/${tag.uid}/${note.uid}`).remove())
		);
		await this.database.ref(`notes/${this.auth.user.uid}/${note.uid}`).remove();
	}

	setChecked(noteUid: string, checked: string[]) {
		return this.database.ref(`notes/${this.auth.user.uid}/${noteUid}/checked`).set(checked);
	}
}

export const DatabaseContext = createContext(null);

export const databaseStore = new Database();
