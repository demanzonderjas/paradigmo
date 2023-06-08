import { useEffect, useState } from "react";
import { useNotes } from "@/hooks/useNotes";
import { TNote, TTag } from "@/typings/notes";
import { Button } from "../form/Button";
import { TagAutocomplete } from "../tags/TagAutocomplete";
import { TagList } from "../tags/TagList";
import { useRouter } from "next/router";
import { RichTextField } from "../form/RichTextField";
import { DateString } from "../layout/DateString";

export const NoteForm: React.FC<{ seed?: TNote }> = ({ seed }) => {
	const [note, setNote] = useState("");
	const [source, setSource] = useState("");
	const [tags, setTags] = useState<TTag[]>([]);
	const { addNote, updateNote, addTag, deleteNote } = useNotes();
	const { push } = useRouter();

	const handleSubmit = async () => {
		const noteData: TNote = { text: note, tags, source, timestamp: Date.now() };
		if (seed) {
			await updateNote(seed, noteData);
			push(`/notes/view/${seed.uid}`);
		} else {
			const uid = await addNote(noteData);
			push(`/notes/view/${uid}`);
		}
	};

	const addTagToNote = async ({ name, uid }: TTag) => {
		if (tags.some((tag) => tag.uid === uid)) {
			return;
		}
		const tag = uid ? { name, uid } : await addTag(name);
		setTags([...tags, tag]);
	};

	const removeTag = (uid: string) => {
		setTags(tags.filter((t) => t.uid !== uid));
	};

	const handleDelete = async () => {
		await deleteNote({ ...seed, tags });
		push("/");
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
			<div className="fields text-black flex flex-start flex-col flex-auto justify-center gap-5 flex-wrap">
				<div>
					<DateString timestamp={seed ? seed.timestamp : Date.now()} />
				</div>
				<RichTextField value={note} setValue={setNote} />
				<input
					className="w-full p-2"
					placeholder="source"
					type="text"
					value={source}
					onChange={(e) => setSource(e.target.value)}
				/>
				<TagAutocomplete addTag={addTagToNote} />
				<TagList tags={tags} removeTag={removeTag} />
			</div>
			<Button text={seed ? "Update note" : "Add note"} onClick={handleSubmit} />
			{seed && <Button text="Delete note" onClick={handleDelete} theme="danger" />}
		</form>
	);
};
