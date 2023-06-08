export const Button: React.FC<{
	text: string;
	type?: "button" | "submit";
	onClick?: Function;
	theme?: string;
	size?: string;
}> = ({ text, type = "button", onClick, theme, size }) => {
	return (
		<button
			type={type}
			className={`${
				size === "small" ? "py-0 px-2" : "p-4"
			} border-2 text-white border-white flex-none hover:bg-white hover:text-black ${
				theme === "danger" ? "bg-red" : ""
			}`}
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
