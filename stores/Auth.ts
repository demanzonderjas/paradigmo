import { action, makeAutoObservable } from "mobx";
import { Database } from "./Database";
import firebase from "firebase/compat/app";

export class Auth {
    database: Database = null;   
	ui: any = null;
	user: any = null;

    constructor(database: Database) {
        this.database = database;
		this.listenForUser();
            makeAutoObservable(this, {
			initUI: action.bound,
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
			new firebaseui.auth.AuthUI(this.database.firebase.auth());
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

}