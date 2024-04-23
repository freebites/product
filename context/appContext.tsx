import React, { Children, createContext, useState } from "react";

/* this is a context to store application state, UI preferences, etc.
 * Update as needed.
 */

// define types for the provider
type AppContextType = {
	// so we can edit filters directly from the filter modal
	filters: string; // string so we can use directly as a query parameter
	setFilters: (string) => void;
	sort: string;
	setSort: (string) => void;
};

// define the app's context here
export const AppContext = React.createContext<AppContextType>({
	filters: "",
	setFilters: () => {},
	sort: "",
	setSort: () => {},
});

export const AppContextProvider = ({ children }) => {
	const [filters, setFilters] = useState<string>("");
	const [sort, setSort] = useState<string>("");

	// note: we can put set functions in wrapper functions if there's some
	// additional logic required

	return (
		<AppContext.Provider
			value={{
				filters,
				setFilters,
				sort,
				setSort,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
