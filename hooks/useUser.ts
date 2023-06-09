import { useContext } from "react";
import { Database, DatabaseContext } from "../stores/Database";

export function useUser() {
	const database: Database = useContext(DatabaseContext);

	return {
		user: database.auth.user,
		initUI: database.auth.initUI,
	};
}
