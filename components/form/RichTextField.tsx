import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const listOfButtons = "bold,italic,underline,ul,ol,indent,outdent,left,link,source";

const joditConfig = {
	readonly: false,
	buttons: listOfButtons,
	buttonsSM: listOfButtons,
	buttonsMD: listOfButtons,
	buttonsXS: listOfButtons,
	textAlign: "left",
	width: "100%",
};

export const RichTextField: React.FC<{ value: string; setValue: Function }> = ({
	value,
	setValue,
}) => {
	const editor = useRef(null);

	const config = useMemo(() => ({ ...joditConfig, height: "275px" }), []);

	return (
		<div className="RichTextField w-full">
			<JoditEditor
				ref={editor}
				value={value}
				config={config}
				onBlur={(newContent) => setValue(newContent)}
			/>
		</div>
	);
};
