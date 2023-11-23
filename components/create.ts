import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import axios from "axios";

const create = async (props) => {
	/* If props.itemId is null, assign it the next available ID */

	try {
		// Replace 'your-backend-api-url' with the actual URL of your backend API
		console.log("try");
		const response = await axios.post(
			"http://192.168.1.199:3001/api/Posts",
			{
				title: props.title,
				description: props.description,
				imageURIs: props.imageURIs,
				tag: props.tag,
				location: props.location,
				comments: props.comments,
				post_id: props.post_id,
				room: props.room,
				postTime: props.postTime,
			}
		);

		// Handle the response or any further actions
		console.log("Item added successfully:", response.data);
	} catch (error) {
		console.error("Error adding item:", error);
	}
};

//         const newPost ({
//                 // _id: mongoose.Schema.Types.ObjectID,
//                 title: props.title,
//                 description: props.description,
//                 imageURIs: [imageURI],
//                 tag: tags,
//                 location: String,
//                 comments: [comment],
//                 post_id: String,
//                 room: String,
//                 postTime: Date,

// });

export default create;
