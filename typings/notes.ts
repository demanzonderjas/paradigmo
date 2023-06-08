export type TNote = {
	text: string;
	tags: TTag[];
	uid?: string;
	source?: string;
	timestamp?: number;
};

export type TTag = {
	name: string;
	uid?: string;
};
