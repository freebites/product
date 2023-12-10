import { Image, View, Text, StyleSheet, Pressable } from "react-native";
import React, { forwardRef, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components/native";
import { postType } from "../../context/postContext";
import { StyleSheetContext } from "styled-components";
import { faBookmark } from "@fortawesome/free-solid-svg-icons/faBookmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { storage } from "../../config";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAllPosts, getOne } from "../../server/read";
import create from "../../server/create";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { getDownloadURL, ref } from "firebase/storage";

const placeholderImage = require("../../assets/images/kemal.jpg");

const dummyData: postType = {
	_id: "",
	title: "testtitle",
	description: "Pizzas, burritos, tacos",
	imageURIs: ["../../assets/images/the-pizza-box.jpeg"],
	tags: {
		perishable: true,
		allergens: ["peanuts"],
		diet: ["none"],
	},
	location: "JCC 180",
	comments: [],
	post_id: "",
	room: "123",
	postTime: new Date(),
};

export const HomePost = (props) => {
	// temp fix for null
	if (!props.post.imageURIs) {
		props.post.imageURIs = [];
	}

	const [imageURL, setImageURL] = useState(null);

	useEffect(() => {
		const loadImageURL = async () => {
			try {
				// grab firebase URL from Firebase
				const url = await getDownloadURL(
					ref(storage, props.post.imageURIs[0])
				);
				setImageURL(url);
			} catch (error) {
				setImageURL(placeholderImage); // set image to dummy pizza when not found
				console.error("Error loading image URL:", error);
			}
		};

		loadImageURL();
	}, [props.post.imageURIs[0]]);
	//const [imageURL, setImageURL] = useState();

	return (
		<Pressable style={styles.mainbox} onPress={props.onPress}>
			<View style={styles.imagebox}>
				<Image source={{ uri: imageURL }} style={styles.image} />
			</View>
			<View style={styles.sidebox}>
				<Pressable>
					<FontAwesomeIcon
						icon={faBookmark}
						style={styles.bookmark}
					/>
				</Pressable>
				<View style={styles.location}>
					<Text>{props.post.location}</Text>
				</View>
				<Text style={styles.description}>{props.post.title}</Text>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	mainbox: {
		width: "100%",
		backgroundColor: "white",
		height: 151,
		// elevation: 5,

		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 15,

		flexDirection: "row",
	},
	imagebox: {
		// flex : 1,
		width: 135,
		marginRight: 10,
	},
	image: {
		flex: 1,
		borderRadius: 15,
	},
	sidebox: {
		flex: 3,
		marginLeft: 10,
		flexDirection: "column",
	},
	location: {
		height: 25,
		flexDirection: "row",
	},
	bookmark: {
		width: 20,
		height: 25,
		flexDirection: "row",
		alignSelf: "flex-end",

		// flex : 1,
		// width : 10,
	},
	description: {
		height: 40,
		flexDirection: "row",
	},
});

export default HomePost;
