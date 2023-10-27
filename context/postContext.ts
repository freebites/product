import React, { createContext, useState } from "react";

type tags = {
	perishable: boolean;
	allergens: string[];
	diet: string[];
};

type comment = {
	username: string;
	body: string;
	timestamp: Date; // may need to be changed to string
};

type postType = {
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

const EmptyPost: postType = {
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
