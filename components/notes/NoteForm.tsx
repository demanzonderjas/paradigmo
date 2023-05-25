import { FormEvent, useState } from "react";
import { useNotes } from "../../hooks/useNotes";

export function NoteForm() {
	const [note, setNote] = useState("");
	const [tags, setTags] = useState([""]);
	const { addNote } = useNotes();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await addNote({ note, tags });
		setNote("");
	};

	const setTag = (index: number, value: string) => {
		const clone = [...tags];
		clone[index] = value;
		setTags(clone);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-auto gap-5"
			style={{ maxWidth: "500px", maxHeight: "400px" }}
		>
			<textarea
				className="p-4 text-xl text-black flex-auto w-full"
				value={note}
				onChange={(e) => setNote(e.target.value)}
			/>
			{tags.map((tag, index) => (
				<div className="tag" key={index}>
					<input
						className="p-4 text-xl text-black flex-auto w-full"
						type="text"
						value={tag}
						onChange={(e) => setTag(index, e.target.value)}
					/>
				</div>
			))}
			<button type="submit" className="p-4 border-2 border-white">
				Add
			</button>
		</form>
	);
}
