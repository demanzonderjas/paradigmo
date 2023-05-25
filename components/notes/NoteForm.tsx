import { FormEvent, useEffect, useRef, useState } from "react";
import { useNotes } from "@/hooks/useNotes";
import { TTag } from "@/typings/notes";
import { GrowingTextbox } from "./GrowingTextbox";

export function NoteForm() {
	const [note, setNote] = useState("");
	const [tags, setTags] = useState<TTag[]>([]);
	const [tag, setTag] = useState("");
	const { addNote, addTag } = useNotes();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await addNote({ text: note, tags });
		setNote("");
	};

	const addTagToNote = async (e: FormEvent, name: string) => {
		e.preventDefault();
		const tag = await addTag(name);
		setTags([...tags, tag]);
		setTag("");
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-auto flex-col gap-5 max-w-[50%]">
			<div className="fields flex flex-start flex-auto justify-center gap-5 flex-wrap">
				<GrowingTextbox value={note} setValue={setNote} />
				<div className="tag flex items-center gap-10">
					<input
						className="p-2 text-md text-black flex-auto w-full"
						type="text"
						value={tag}
						onChange={(e) => setTag(e.target.value)}
						style={{ height: "50px" }}
					/>
					<button
						className="p-4 border-2 border-white flex-none"
						onClick={(e) => addTagToNote(e, tag)}
					>
						Add tag
					</button>
				</div>
				<div className="tags flex gap-5 flex-wrap w-full">
					{tags.map((tag, index) => (
						<div className="tag" key={index}>
							<span className="p-4 bg-white text-black">{tag.name}</span>
						</div>
					))}
				</div>
			</div>
			<button type="submit" className="p-4 border-2 border-white">
				Add
			</button>
		</form>
	);
}
