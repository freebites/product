import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import axios from "axios";

const apiURL = process.env.EXPO_PUBLIC_MONGO_ENDPOINT;
const create = async (props) => {
	// function to normalize tags. this will make it easier to search/filter
	const normalizeTags = (tags) => {
		return {
			// for now we're just moving it all to lowercase
			perishable: tags.perishable.toLowerCase(),
			allergens: tags.allergens.map((allergen) => allergen.toLowerCase()),
			diet: tags.diet.map((d) => d.toLowerCase()),
		};
	};

	try {
		// Replace 'your-backend-api-url' with the actual URL of your backend API
		// console.log("try");
		console.log(props);
		const normalizedTags = normalizeTags(props.tags); // Normalize tags
		const response = await axios.post(`${apiURL}:3001/api/Posts`, {
			title: props.title,
			description: props.description,
			imageURIs: props.imageURIs,
			tag: normalizedTags,
			location: props.location,
			comments: props.comments,
			post_id: props.post_id,
			room: props.room,
			postTime: props.postTime,
			postedBy: props.postedBy,
		});

		// Handle the response or any further actions
		console.log("Item added successfully:", response);
	} catch (error) {
		console.error("Error adding item:", error);
	}
};

export default create;
