import React, { createContext, useState } from "react";

/// types for tags
export type tags = {
	perishable: boolean;
	allergens: string[];
	diet: string[];
};

// types for comments
export type comment = {
	username: string;
	body: string;
	timestamp: Date; // may need to be changed to string
};

// types for a post
export type postType = {
	title: string;
	description: string;
	imageURIs: string[];
	tags: tags;
	location: string;
	comments: comment[];
	post_id: string;
	room: string;
	postTime: Date;
};

// default empty post
export const EmptyPost: postType = {
	title: "",
	description: "",
	imageURIs: [""],
	tags: {
		perishable: true,
		allergens: [],
		diet: [],
	},
	location: "",
	comments: [],
	post_id: "",
	room: "",
	postTime: undefined,
};

export const DataContext = createContext(EmptyPost);

export const DataProvider = ({ children }) => {
	const [contextData, setContextData] = useState({
		theme: "light",
		language: "en",
		// other values...
	});

	const updateContextData = (newData) => {
		setContextData({ ...contextData, ...newData });
	};

	return (
		// <DataContext.Provider value={{ contextData, updateContextData }}>
		// 	{children}
		// </DataContext.Provider>
		null
	);
};
