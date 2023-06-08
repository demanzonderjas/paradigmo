import { useNotes } from "@/hooks/useNotes";
import { TNote } from "@/typings/notes";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { NoteList } from "./NoteList";

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

	return <NoteList notes={notes} />;
});
