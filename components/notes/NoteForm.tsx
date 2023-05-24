import { FormEvent, useState } from "react";
import { useNotes } from "../../hooks/useNotes";

export function NoteForm() {
	const [note, setNote] = useState("");
	const { addNote } = useNotes();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		addNote({ note });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="fields flex gap-5 items-center">
				<textarea
					className="p-4 text-xl text-black flex-auto w-full"
					value={note}
					onChange={(e) => setNote(e.target.value)}
					style={{ minHeight: "200px", minWidth: "50%" }}
				/>
				<button type="submit" className="p-4 border-2 border-white">
					Add
				</button>
			</div>
		</form>
	);
}
