import { useEffect, useRef, useState } from "react";
import { RichTextField } from "../form/RichTextField";

export const GrowingTextbox: React.FC<{ value: string; setValue: Function }> = ({
	value,
	setValue,
}) => {
	const MINIMAL_TEXTAREA_SIZE = 150;
	const [textAreaSize, setTextAreaSize] = useState(MINIMAL_TEXTAREA_SIZE);
	const textAreaRef = useRef(null);

	useEffect(() => {
		if (!textAreaRef.current) {
			return;
		}
		const charSize = 20;
		const charsPerLine = textAreaRef.current.clientWidth / charSize;
		const LINE_SIZE = 30;
		const totalLines = (value.length / charsPerLine) | 0;
		const targetSize = totalLines * LINE_SIZE;
		setTextAreaSize(Math.max(targetSize, MINIMAL_TEXTAREA_SIZE));
	}, [textAreaRef, value]);

	return <RichTextField value={value} setValue={setValue} height={textAreaSize} />;
};
