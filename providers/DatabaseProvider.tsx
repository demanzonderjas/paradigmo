import React from "react";
import { Database, DatabaseContext } from "../stores/Database";

export const DatabaseProvider: React.FC<{ children: any; store: Database }> = ({
	children,
	store,
}) => {
	return <DatabaseContext.Provider value={store}>{children}</DatabaseContext.Provider>;
};
