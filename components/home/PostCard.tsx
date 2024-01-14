import { Image, View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { EmptyPost, postType } from "../../context/postContext";
import { Divider } from "react-native-elements";
import { getOne } from "../../server/read";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";

const placeholderImage = require("../../assets/images/kemal.jpg");

export const PostCard = (props) => {
	// console.log(props.id);
	const [singlePost, setSinglePost] = useState(EmptyPost);
	const [imageURL, setImageURL] = useState(null);
	useEffect(() => {
		const fetchPost = async () => {
			try {
				const postData = await getOne(props.id);
				setSinglePost(postData);
				const url = await getDownloadURL(
					ref(storage, postData.imageURIs[0])
				);
				setImageURL(url);
			} catch (error) {
				setImageURL(placeholderImage);
				console.error("Error fetching post:", error);
			}
		};

		fetchPost();
	}, [props.id]);
	// const fetchPost = async () => {
	// 	singlePost = await getOne(props.id);
	// 	// setSinglePost(postData)
	// }

	console.log(JSON.stringify(singlePost));
	// console.log("location: " + singlePost.location)
	return (
		<View style={styles.mainbox}>
			<Image
				style={styles.image}
				source={{
					uri: imageURL,
				}}
			/>
			<View style={styles.description}>
				<Text style={styles.location}>{singlePost.location}</Text>
				<Text style={styles.innerDes}>{singlePost.description}</Text>
				<View style={styles.tags}></View>
				<Divider orientation="horizontal" style={styles.divider} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainbox: {
		flex: 1,
		backgroundColor: "white",
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 20,
	},
	image: {
		height: 250,
		borderRadius: 15,
	},
	description: {
		height: 105,
		marginVertical: 20,
	},
	location: {
		height: 30,
		fontWeight: "bold",
		marginBottom: 10,
	},
	innerDes: {
		height: 50,
		width: 200,
		marginBottom: 10,
	},
	tags: {
		height: 25,
	},
	divider: {
		marginVertical: 15,
	},
	comment: {},
});
export default PostCard;
