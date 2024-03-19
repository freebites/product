import { View, Text, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Link, router, useFocusEffect } from "expo-router";
import { PostContext, EmptyPost } from "../../../context/postContext";
import BackButton from "../../../components/common/BackButton";
import PlainButton2 from "../../../components/common/PlainButton2";
import ImageViewer from "../../../components/common/ImageViewer";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { storage } from "../../../firebase";
import {
	getDownloadURL,
	ref,
	uploadBytes,
	uploadBytesResumable,
} from "firebase/storage";
import create from "../../../api/posts/create";
import NextButtonText from "../../../components/post/NextButtonText";
import ProgressBar from "../../../components/post/ProgressBar";
import { postStyles } from "./styles/postStyles";

const placeholder = require("../../../assets/images/kemal.jpg");

export default function reviewpost() {
	const { progress, updateProgress, postData, updatePostData } =
		useContext(PostContext);

	useFocusEffect(() => {
		updateProgress(4);
	});
	// function to upload one picture given a local URI
	const uploadPicture = async (uri) => {
		//setUploading(true);

		try {
			// grab the picture from the URI, convert to blob
			const response: any = await fetch(uri);
			const blob = await response.blob();

			const storageRef = ref(
				storage,
				"post/" + uri.substring(uri.lastIndexOf("/") + 1)
			);

			// upload to the server, returns a Promise string
			return uploadBytes(storageRef, blob).then(async (snapshot) => {
				//console.log("uploaded a blob");
				return await snapshot.ref.fullPath; // store firebase path NOT URL
				// need two returns cuz async
			});
		} catch (error) {
			console.log("fail", error);
		}
	};

	// function to upload all images
	const uploadAllImages = async (uris: string[]) => {
		try {
			const imagePaths = await Promise.all(
				uris.map((uri) => uploadPicture(uri))
			);

			create({ ...postData, imageURIs: imagePaths }); // upload to mongoDB!r
			updatePostData(EmptyPost); // clear local post data

			// Other code...
		} catch (error) {
			console.error("Error during image upload:", error);
			// Handle errors as needed
		}
	};

	return (
		<SafeAreaView style={postStyles.container}>
			<ProgressBar />
			<Text>review post here</Text>
			<View>
				<ImageViewer
					placeholderImageSource={placeholder}
					selectedImage={postData.imageURIs}
				></ImageViewer>
			</View>
			<Text>Description: {postData.description}</Text>
			<Text> Filters: </Text>
			<Text>Location: {postData.location} </Text>
			<Text> Perishable: {postData.tags.perishable ? "yes" : "no"}</Text>
			<Text> Allergens: {postData.tags.allergens.join(", ")}</Text>
			<Text>Diets: {postData.tags.diet.join(", ")}</Text>

			<Link href="/home" asChild>
				<NextButtonText
					onPress={() => uploadAllImages(postData.imageURIs)}
					text={"Post"}
				/>
			</Link>
		</SafeAreaView>
	);
}
