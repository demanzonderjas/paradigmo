import { MouseEventHandler } from "react";

export function Icon({
	handleClick,
	children,
	evenOdd,
}: {
	handleClick: MouseEventHandler<HTMLDivElement>;
	children: any;
	evenOdd?: boolean;
}) {
	return (
		<div
			className="logo flex cursor-pointer transition-transform hover:rotate-90"
			style={{ width: "3em", height: "3em" }}
			onClick={handleClick}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fillRule={evenOdd ? "evenodd" : null}
				clipRule={evenOdd ? "evenodd" : null}
				className="h-full w-full"
			>
				{children}
			</svg>
		</div>
	);
}
