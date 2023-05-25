import { useState } from "react";
import { useNotes } from "@/hooks/useNotes";
import { TTag } from "@/typings/notes";
import { GrowingTextbox } from "./GrowingTextbox";
import { Button } from "../form/Button";
import { TagAutocomplete } from "../tags/TagAutocomplete";
import { TagList } from "../tags/TagList";

export function NoteForm() {
	const [note, setNote] = useState("");
	const [tags, setTags] = useState<TTag[]>([]);
	const { addNote, addTag } = useNotes();

	const handleSubmit = async () => {
		await addNote({ text: note, tags });
		setNote("");
		setTags([]);
	};

	const addTagToNote = async ({ name, uid }: TTag) => {
		const tag = uid ? { name, uid } : await addTag(name);
		setTags([...tags, tag]);
	};

	return (
		<form className="flex flex-auto flex-col gap-5 max-w-2xl px-4">
			<div className="fields flex flex-start flex-auto justify-center gap-5 flex-wrap">
				<GrowingTextbox value={note} setValue={setNote} />
				<TagAutocomplete addTag={addTagToNote} />
				<TagList tags={tags} />
			</div>
			<Button text="Add note" onClick={handleSubmit} />
		</form>
	);
}