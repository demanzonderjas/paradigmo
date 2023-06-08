export const Button: React.FC<{
	text: string;
	type?: "button" | "submit";
	onClick?: Function;
	theme?: string;
}> = ({ text, type = "button", onClick, theme }) => {
	return (
		<button
			type={type}
			className={`p-4 border-2 text-white border-white flex-none hover:bg-white hover:text-black ${
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
