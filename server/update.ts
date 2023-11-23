import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import axios from "axios";
const apiURL = process.env.EXPO_PUBLIC_MONGO_ENDPOINT;
const update = async (props, itemID) => {
	try {
		const response = await axios.put(`${apiURL}:3001/api/Posts/${itemID}`, {
			title: props.title,
			description: props.description,
			imageURIs: props.imageURIs,
			tag: props.tag,
			location: props.location,
			comments: props.comments,
			post_id: props.post_id,
			room: props.room,
			postTime: props.postTime,
		});
		console.log("Item updated successfully:", response.data);
	} catch (error) {
		console.error("Error updating item IN FRONTEND  :", error);
	}
};

export default update;
