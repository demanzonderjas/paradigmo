import { Merienda } from "next/font/google";
import { Profile } from "../components/user/Profile";
import { Login } from "../components/user/Login";

const mainFont = Merienda({ subsets: ["latin"] });

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${mainFont.className}`}
		>
			<h1>Welcome</h1>
			<Login />
			<Profile />
		</main>
	);
}
