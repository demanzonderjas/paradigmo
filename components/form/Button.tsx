import { MouseEventHandler } from "react";

export const Button: React.FC<{ text: string; type?: "button" | "submit"; onClick?: Function }> = ({
	text,
	type = "button",
	onClick,
}) => {
	return (
		<button
			type={type}
			className="p-4 border-2 border-white flex-none hover:bg-white hover:text-black"
			onClick={(e, ...args) => {
				e.preventDefault();
				if (!!onClick) {
					onClick(...args);
				}
			}}
		>
			{text}
		</button>
	);
};
