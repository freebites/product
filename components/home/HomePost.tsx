import { Image, View, Text, StyleSheet, Pressable } from "react-native";
import React, { forwardRef, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components/native";
import { postType } from "../../context/postContext";
import { StyleSheetContext } from "styled-components";
import { faBookmark } from "@fortawesome/free-solid-svg-icons/faBookmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { storage } from "../../config";
import { getDownloadURL, ref } from "firebase/storage";



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


const onBookmarkPress = (postId) => {
	// User specific bookmarked per post. Possibliy a list of bookmarked postIds for each user. 
}
export const HomePost = (props) => {
	// temp fix for null
	if (!props.post.imageURIs) {
		props.post.imageURIs = [];
	}

	const [imageURL, setImageURL] = useState(null);

	useEffect(() => {
		const loadImageURL = async () => {
			try {
				const url = await getDownloadURL(
					ref(storage, props.post.imageURIs[0])
				);
				setImageURL(url);
			} catch (error) {
				console.error("Error loading image URL:", error);
				setImageURL(dummyData.imageURIs[0]); // set image to dummy pizza when not found
			}
		};

		loadImageURL();
	}, [props.post.imageURIs[0]]);

	return (
		<Pressable style={styles.mainbox} onPress={props.onPress}>
			<View style={styles.imagebox}>
				<Image
					source={{
						uri: imageURL,
					}}
					style={styles.image}
				/>
			</View>
			<View style={styles.sidebox}>
				<Pressable>
					<FontAwesomeIcon
						icon={faBookmark}
						style={styles.bookmark}
					/>
				</Pressable>
					<Text style={styles.location}>{props.post.location}</Text>
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

		boxShadow: '0px 4px 2px #BCAEAE',
		
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 15,

		flexDirection: "row",
	},
	imagebox: {
		width: 135,
		marginRight: 10,
	},
	image: {
		flex : 1,
		borderRadius: 15,
	},
	sidebox: {
		flex: 3,
		marginLeft: 10,
		flexDirection: "column",
	},
	location: {
		fontSize: 18,
		fontStyle: "normal",
		lineHeight: 25,
		fontWeight: "bold",
		marginBottom: 10
	},
	bookmark: {
		width: 20,
		height: 25,
		flexDirection: "row",
		alignSelf: "flex-end",
	},
	description: {
		fontSize: 12,
		fontStyle: "normal", 
		fontWeight: "normal",
		lineHeight: 16,
		flexDirection: "row",
	},
});

export default HomePost;
