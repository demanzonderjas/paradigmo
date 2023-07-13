import React from "react";
import { prefixWithZeroBelow10 } from "../../utils/datetime";

export const DateString: React.FC<{ timestamp: number }> = ({ timestamp }) => {
	const date = new Date(timestamp);

	return (
		<span>
			{date.getDate()}-{prefixWithZeroBelow10(date.getMonth() + 1)}-{date.getFullYear()}{" "}
			{prefixWithZeroBelow10(date.getHours())}:{prefixWithZeroBelow10(date.getMinutes())}
		</span>
	);
};
