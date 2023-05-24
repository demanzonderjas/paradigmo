import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { DatabaseProvider } from "../providers/DatabaseProvider";
import { databaseStore } from "../stores/Database";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<DatabaseProvider store={databaseStore}>
			<Component {...pageProps} />;
		</DatabaseProvider>
	);
}
