import React, { Children, createContext, useState } from "react";

/* this is a context to store application state, UI preferences, etc.
 * Update as needed.
 */

type filterTypes = {
	[key: string]: string;
};
// define types for the provider
type AppContextType = {
	// so we can edit filters directly from the filter modal
	filters: filterTypes; // string so we can use directly as a query parameter
	setFilters: (string) => void;
	sort: string;
	setSort: (string) => void;
	location: locationInfo;
	setLocation: (locationInfo) => void;
	userToFilter: string; // firebase UID of currently authenticated/searched user
	setUserToFilter: (string) => void;
};
export const noLocation: locationInfo = {
	latitude: "",
	longitude: "",
};
// define the app's context here
export const AppContext = React.createContext<AppContextType>({
	filters: {},
	setFilters: () => {},
	sort: "",
	setSort: () => {},
	location: noLocation,
	setLocation: () => {},
	userToFilter: "",
	setUserToFilter: () => {},
});

export interface locationInfo {
	latitude: string;
	longitude: string;
}

export const AppContextProvider = ({ children }) => {
	const [filters, setFilters] = useState<filterTypes>({
		vegan: "",
		vegetarian: "",
		gluten: "",
		lactose: "",
		kosher: "",
		halal: "",
	});
	const [location, setLocation] = useState<locationInfo>({
		latitude: "",
		longitude: "",
	});
	const [sort, setSort] = useState<string>("");

	const [userToFilter, setUserToFilter] = useState<string>("");

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
				userToFilter,
				setUserToFilter,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
