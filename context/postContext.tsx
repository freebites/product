import React, { createContext, useState } from "react";

/// types for tags
export type tags = {
	perishable: string;
	allergens: string[];
	diet: string[];
};

// types for comments
export type comment = {
	_id: string;
	id: number;
	username: string;
	body: string;
	timestamp: Date; // may need to be changed to string
};

// types for a post
export type postType = {
	_id: string;
	title: string;
	description: string;
	imageURIs: string[];
	tags: tags;
	location: Location;
	comments: comment[];
	post_id: string;
	room: string;
	postTime: Date;
	postedBy: string; // firebase UID
};

export type Location = {
	place_id: string;
	location: {
		type: string;
		coordinates: [number, number];
	};
};

export type TagOptionType = {
	diet: string[];
	allergies: string[];
};

type PostContextType = {
	postData: postType;
	updatePostData: (newData: Partial<postType>) => void;
	progress: number;
	updateProgress: (newScreen: number) => void;
	tagOptions: TagOptionType;
	updateTagOptions: (newTag: Partial<TagOptionType>) => void;
	resetContext: () => void;
};

// default empty post
export const EmptyPost: postType = {
	_id: "",
	title: "",
	description: "",
	imageURIs: [],
	tags: {
		perishable: "perishable",
		allergens: [],
		diet: [],
	},
	location: {
		place_id: "",
		location: {
			type: "Point",
			coordinates: [0, 0],
		},
	},
	comments: [],
	post_id: "",
	room: "",
	postTime: undefined,
	postedBy: "",
};

export const defaultOptions: TagOptionType = {
	// these should be set to lower case
	diet: ["vegan", "vegetarian", "dairy-free", "halal", "gluten-free"],
	allergies: ["peanut", "tree nut", "dairy", "eggs"],
};
export const PostContext = createContext<PostContextType>({
	postData: EmptyPost,
	updatePostData: () => {},
	progress: 0,
	updateProgress: () => {},
	tagOptions: defaultOptions,
	updateTagOptions: () => {},
	resetContext: () => {},
});

export const PostProvider = ({ children }) => {
	const [postData, setPostData] = useState<postType>(EmptyPost);
	const [progress, setProgress] = useState<number>(0);
	const [tagOptions, setTagOptions] = useState<TagOptionType>(defaultOptions);
	// update context states
	const updatePostData = (newData: Partial<postType>) => {
		setPostData({ ...postData, ...newData });
	};

	const updateProgress = (newScreen: number) => {
		setProgress(newScreen);
	};

	const updateTagOptions = (newTag: Partial<TagOptionType>) => {
		setTagOptions({ ...tagOptions, ...newTag });
	};

	const resetContext = () => {
		setPostData(EmptyPost), setProgress(0), setTagOptions(defaultOptions);
	};

	return (
		<PostContext.Provider
			value={{
				postData,
				updatePostData,
				progress,
				updateProgress,
				tagOptions,
				updateTagOptions,
				resetContext,
			}}
		>
			{children}
		</PostContext.Provider>
	);
};
