import { useEffect, useState } from "react";
import { useNotes } from "@/hooks/useNotes";
import { TNote, TTag } from "@/typings/notes";
import { GrowingTextbox } from "./GrowingTextbox";
import { Button } from "../form/Button";
import { TagAutocomplete } from "../tags/TagAutocomplete";
import { TagList } from "../tags/TagList";
import { useRouter } from "next/router";

export const NoteForm: React.FC<{ seed: TNote }> = ({ seed }) => {
	const [note, setNote] = useState("");
	const [source, setSource] = useState("");
	const [tags, setTags] = useState<TTag[]>([]);
	const { addNote, updateNote, addTag } = useNotes();
	const { push } = useRouter();

	const handleSubmit = async () => {
		if (seed) {
			await updateNote(seed, { text: note, tags, source });
			push(`/notes/view/${seed.uid}`);
		} else {
			const uid = await addNote({ text: note, tags, source });
			push(`/notes/view/${uid}`);
		}
	};

	const addTagToNote = async ({ name, uid }: TTag) => {
		const tag = uid ? { name, uid } : await addTag(name);
		setTags([...tags, tag]);
	};

	useEffect(() => {
		if (seed) {
			setNote(seed.text || "");
			setSource(seed.source || "");
			setTags(seed.tags || []);
		}
	}, [seed]);

	return (
		<form className="flex flex-auto flex-col gap-5 max-w-2xl px-4">
			<div className="fields text-black flex flex-start flex-auto justify-center gap-5 flex-wrap">
				<GrowingTextbox value={note} setValue={setNote} />
				<input
					className="w-full p-2"
					placeholder="source"
					type="text"
					value={source}
					onChange={(e) => setSource(e.target.value)}
				/>
				<TagAutocomplete addTag={addTagToNote} />
				<TagList tags={tags} />
			</div>
			<Button text={seed ? "Update note" : "Add note"} onClick={handleSubmit} />
		</form>
	);
};
