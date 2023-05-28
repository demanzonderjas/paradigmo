import { Login } from "../user/Login";
import { Menu } from "./Menu";

export function Page({ title, children }: { title: string; children?: any }) {
	return (
		<>
			<Menu />
			<h1>{title}</h1>
			{children}
			<Login />
		</>
	);
}
