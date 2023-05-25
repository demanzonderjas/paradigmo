export type TNote = {
    text: string;
    tags: TTag[];
}

export type TTag = {
    name: string;
    uid?: string;
}