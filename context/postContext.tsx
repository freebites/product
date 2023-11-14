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
	imageURIs: [],
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

type PostContextType = {
	postData: postType;
	updatePostData: (newData: Partial<postType>) => void;
};

export const PostContext = createContext<PostContextType>({
	postData: EmptyPost,
	updatePostData: () => {},
});

export const PostProvider = ({ children }) => {
	const [postData, setPostData] = useState<postType>(EmptyPost);

	const updatePostData = (newData: Partial<postType>) => {
		setPostData({ ...postData, ...newData });
	};

	return (
		<PostContext.Provider value={{ postData, updatePostData }}>
			{children}
		</PostContext.Provider>
	);
};
