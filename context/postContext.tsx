import React, { createContext, useState } from "react";

/// types for tags
export type tags = {
	perishable: boolean;
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
};

export type Location = {
	place_id: string;
	location: {
		type: string;
		coordinates: [number, number];
	};
};
// default empty post
export const EmptyPost: postType = {
	_id: "",
	title: "",
	description: "",
	imageURIs: [],
	tags: {
		perishable: true,
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
};

type PostContextType = {
	postData: postType;
	updatePostData: (newData: Partial<postType>) => void;
	progress: number;
	updateProgress: (newScreen: number) => void;
};

export const PostContext = createContext<PostContextType>({
	postData: EmptyPost,
	updatePostData: () => {},
	progress: 0,
	updateProgress: () => {},
});

export const PostProvider = ({ children }) => {
	const [postData, setPostData] = useState<postType>(EmptyPost);
	const [progress, setProgress] = useState<number>(0);

	// update context states
	const updatePostData = (newData: Partial<postType>) => {
		setPostData({ ...postData, ...newData });
	};

	const updateProgress = (newScreen: number) => {
		setProgress(newScreen);
	};

	return (
		<PostContext.Provider
			value={{ postData, updatePostData, progress, updateProgress }}
		>
			{children}
		</PostContext.Provider>
	);
};
