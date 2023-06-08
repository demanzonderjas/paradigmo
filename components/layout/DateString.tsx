import React from "react";

export const DateString: React.FC<{ timestamp: number }> = ({ timestamp }) => {
	const date = new Date(timestamp);

	return (
		<span>
			{date.getDate()}-{date.getMonth()}-{date.getFullYear()}
		</span>
	);
};
