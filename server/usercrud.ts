import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import axios from "axios";

const apiURL = process.env.EXPO_PUBLIC_MONGO_ENDPOINT;

export const getAllPosts = async () => {
	try {
		//console.log("env variable: ", apiURL);
		const response = await axios.get(`${apiURL}:3001/api/Users`);
		//console.log(response);
		return response.data;
	} catch (error) {
		//console.log("error getting all items:", error);
		throw error;
	}
};

export const getOne = async (userID) => {
	try {
		const response = await axios.get(`${apiURL}:3001/api/Users/${userID}`);
		console.log("getting one");
		return response.data;
	} catch (error) {
		//console.log("error getting all items:", error);
		throw error;
	}
};

export const create = async (props) => {
	/* If props.itemId is null, assign it the next available ID
        /* If there is already an ID, do not assign it a new one */
	// const [itemName, setItemName] = useState('');

	// const postNewItem = async () => {
	// console.log("Gets here");

	try {
		// Replace 'your-backend-api-url' with the actual URL of your backend API
		// console.log("try");
		const response = await axios.post(`${apiURL}:3001/api/Users`, {
			firstName: props.firstName,
			lastName: props.lastName,
			emailAddress: props.emailAddress,
			password: props.password,
			profile: props.profile,
			bio: props.bio,
			pronouns: props.pronouns,
		});

		// Handle the response or any further actions
		console.log("Item added successfully:", response);
	} catch (error) {
		console.error("Error adding item:", error);
	}
};

const update = async (props, userID) => {
	try {
		const response = await axios.put(`${apiURL}:3001/api/Users/${userID}`, {
			firstName: props.firstName,
			lastName: props.lastName,
			emailAddress: props.emailAddress,
			password: props.password,
			profile: props.profile,
			bio: props.bio,
			pronouns: props.pronouns,
		});
		console.log("Item updated successfully:", response.data);
	} catch (error) {
		console.error("Error updating item IN FRONTEND  :", error);
	}
};
