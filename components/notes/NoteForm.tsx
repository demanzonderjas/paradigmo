import { FormEvent, useEffect, useState } from "react";
import { useNotes } from "@/hooks/useNotes";
import { TTag } from "@/typings/notes";
import { GrowingTextbox } from "./GrowingTextbox";
import { Button } from "../form/Button";

export function NoteForm() {
	const [note, setNote] = useState("");
	const [tags, setTags] = useState<TTag[]>([]);
	const [tagList, setTagList] = useState<TTag[]>([]);
	const [tag, setTag] = useState<TTag>({ name: "", uid: null });
	const { addNote, addTag, getTagList } = useNotes();

	useEffect(() => {
		(async () => {
			const tagList = await getTagList();
			setTagList(tagList);
		})();
	}, []);

	const handleSubmit = async () => {
		await addNote({ text: note, tags });
		setNote("");
		setTags([]);
	};

	const addTagToNote = async ({ name, uid }: TTag) => {
		const tag = uid ? { name, uid } : await addTag(name);
		setTags([...tags, tag]);
		setTag({ name: "", uid: null });
	};

	return (
		<form className="flex flex-auto flex-col gap-5 max-w-2xl px-4">
			<div className="fields flex flex-start flex-auto justify-center gap-5 flex-wrap">
				<GrowingTextbox value={note} setValue={setNote} />
				<div className="tag flex items-center justify-between gap-10 w-full">
					<div className="tag-autocomplete relative w-full flex-auto">
						<input
							className="p-2 text-md text-black flex-auto w-full"
							type="text"
							value={tag.name}
							onChange={(e) => setTag({ name: e.target.value, uid: tag.uid })}
							style={{ height: "50px" }}
						/>
						<div className="autocomplete absolute left-0 w-full bg-white shadow-sm">
							{tagList
								.filter(() => !!tag.name)
								.filter((listItem) =>
									listItem.name
										.toString()
										.toLowerCase()
										.match(tag.name.toLowerCase())
								)
								.map((listItem) => (
									<div
										className="p-2 tag border-b-black border-2 text-black hover:text-white hover:bg-black cursor-pointer"
										key={listItem.uid}
										onClick={() => addTagToNote(listItem)}
									>
										{listItem.name}
									</div>
								))}
						</div>
					</div>
					<Button text="Add tag" onClick={() => addTagToNote(tag)} />
				</div>
				<div className="tags flex gap-5 flex-wrap w-full">
					{tags.map((tag, index) => (
						<div className="tag" key={index}>
							<span className="p-4 bg-white text-black">{tag.name}</span>
						</div>
					))}
				</div>
			</div>
			<Button text="Add note" onClick={handleSubmit} />
		</form>
	);
}
