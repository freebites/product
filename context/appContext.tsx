import React, { createContext, useState } from "react";

/* this is a context to store application state, UI preferences, etc.
 * Update as needed.
 */
type AppContextType = {
	// so we can edit filters directly from the filter modal
	filters: string; // string so we can use directly as a query parameter
	setFilters: (string) => void;
	sort: string;
	setSort: (string) => void;
};

const AppContext = React.createContext<AppContextType>({
	filters: "",
	setFilters: () => {},
	sort: "",
	setSort: () => {},
});
