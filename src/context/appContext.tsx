import React, { Children, createContext, useState, useEffect } from "react";
import { getItem } from "../local-storage/asyncStorage"

/* this is a context to store application state, UI preferences, etc.
 * Update as needed.
 */

export interface locationInfo {
	latitude: string | number;
	longitude: string | number;
}

export type filterTypes = {
	[key: string]: string;
};

// define types for the provider
type AppContextType = {
	// so we can edit filters directly from the filter modal
	filters: filterTypes; // string so we can use directly as a query parameter
	setFilters: (arg0: filterTypes) => void;
	sort: string;
	setSort: (arg0: string) => void;
	location: locationInfo;
	setLocation: (arg0: locationInfo) => void;
	userToFilter: string; // firebase UID of currently authenticated/searched user
	setUserToFilter: (arg0: string) => void;
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

export const AppContextProvider = (props: { children: any }) => {
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
	
	useEffect(() => {
		const getState = async () => {
			const newLocation = await getItem("location");
			const newFilter = await getItem("filters");
			const newUserToFilter = await getItem("userToFilter");
			const newSort = await getItem("sort");

			// Check for first time app is opened
			if (newFilter != null) {
				setFilters(newFilter);
			}
			setLocation(newLocation);
			setUserToFilter(newUserToFilter);
			setSort(newSort);
		};

		getState();
	}, []);



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
			{props.children}
		</AppContext.Provider>
	);
};
