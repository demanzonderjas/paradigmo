import { Login } from "../user/Login";

export function Page({ title, children }: { title: string; children?: any }) {
	return (
		<>
			<h1>{title}</h1>
			{children}
			<Login />
		</>
	);
}
