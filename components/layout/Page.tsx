import Head from "next/head";
import { Login } from "../user/Login";
import { Menu } from "./Menu";

export function Page({ title, children }: { title: string; children?: any }) {
	return (
		<>
			<Head>
				<title>{`${title} - Paradigmo`}</title>
			</Head>
			<Menu />
			<h1>{title}</h1>
			{children}
			<Login />
		</>
	);
}
