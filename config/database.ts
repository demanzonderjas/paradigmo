import firebase from "firebase/compat/app";

const firebaseConfig = {
	apiKey: "AIzaSyBYxs9-oitAx6EmBDVcV9RxHyxpPxPpuOs",
	authDomain: "paradigmo.firebaseapp.com",
	projectId: "paradigmo",
	storageBucket: "paradigmo.appspot.com",
	messagingSenderId: "127890333597",
	appId: "1:127890333597:web:409f428ffaf72d0ad89974",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
