import { useNotes } from "@/hooks/useNotes";
import { TNote } from "@/typings/notes";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Note } from "./Note";
import { useUser } from "@/hooks/useUser";

export const Mine: React.FC = observer(() => {
	const [notes, setNotes] = useState<TNote[]>([]);
	const { getMine } = useNotes();
	const { user } = useUser();

	useEffect(() => {
		if (!user) {
			return;
		}
		(async () => {
			const notes = await getMine();
			setNotes(Object.keys(notes).map((noteUid) => ({ ...notes[noteUid], uid: noteUid })));
		})();
	}, [user]);

	return (
		<div className="notes flex flex-wrap justify-center gap-10">
			{notes.map((note) => (
				<Note key={note.uid} {...note} />
			))}
		</div>
	);
});
