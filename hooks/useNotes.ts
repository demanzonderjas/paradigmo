import { useContext } from "react";
import { Database, DatabaseContext } from "../stores/Database";

export function useNotes() {
	const database: Database = useContext(DatabaseContext);

	return {
		addNote: database.addNote,
		addTag: database.addTag,
		getTagList: database.getTagList
	};
}
