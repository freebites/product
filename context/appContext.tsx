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
	location: locationInfo;
	setLocation: (locationInfo) => void;
};
const noLocation: locationInfo = {
	latitude: "",
	longitude: "",
};
// define the app's context here
export const AppContext = React.createContext<AppContextType>({
	filters: "",
	setFilters: () => {},
	sort: "",
	setSort: () => {},
	location: noLocation,
	setLocation: () => {},
});

interface locationInfo {
	latitude: string;
	longitude: string;
}
export const AppContextProvider = ({ children }) => {
	const [filters, setFilters] = useState<string>("");
	const [location, setLocation] = useState<locationInfo>({
		latitude: "",
		longitude: "",
	});
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
				location,
				setLocation,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
