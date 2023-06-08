export type TNote = {
	text?: string;
	list?: TListItem[];
	checked?: string;
	tags: TTag[];
	uid?: string;
	source?: string;
	timestamp?: number;
};

export type TListItem = {
	uid: string;
	text: string;
};

export type TTag = {
	name: string;
	uid?: string;
};
