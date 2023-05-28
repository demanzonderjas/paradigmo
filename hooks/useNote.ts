import { TNote } from "@/typings/notes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useNotes } from "./useNotes";

export function useNote() {
	const [note, setNote] = useState<TNote>(null);
	const { query } = useRouter();
	const { getNote } = useNotes();

	useEffect(() => {
		if (!query.note) {
			return;
		}
		(async () => {
			const note = await getNote(query.note as string);
			setNote(note);
		})();
	}, [query.note]);

	return {
		note,
	};
}
