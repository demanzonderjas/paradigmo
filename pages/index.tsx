import { Merienda } from "next/font/google";

const mainFont = Merienda({ subsets: ["latin"] });

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${mainFont.className}`}
		>
			<h1>Welcome</h1>
			<div id="firebaseui-auth-container"></div>
			<div id="loader"></div>
		</main>
	);
}
