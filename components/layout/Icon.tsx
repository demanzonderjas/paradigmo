import { useRouter } from "next/router";

export function Icon({ href, children }: { href: string; children: any }) {
	const { push } = useRouter();

	return (
		<div
			className="logo flex cursor-pointer transition-transform hover:rotate-90"
			style={{ width: "3em", height: "3em" }}
			onClick={() => push(href)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				className="h-full w-full"
			>
				{children}
			</svg>
		</div>
	);
}
