import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { DatabaseProvider } from "../providers/DatabaseProvider";
import { databaseStore } from "../stores/Database";

import { Merienda } from "next/font/google";
const mainFont = Merienda({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<DatabaseProvider store={databaseStore}>
			<main
				className={`flex min-h-screen flex-col items-center justify-between p-24 ${mainFont.className}`}
			>
				<Component {...pageProps} />
			</main>
		</DatabaseProvider>
	);
}
