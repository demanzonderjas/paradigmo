export type TNote = {
	text: string;
	tags: TTag[];
	uid?: string;
	source?: string;
};

export type TTag = {
	name: string;
	uid?: string;
};
