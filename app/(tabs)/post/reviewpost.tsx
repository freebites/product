import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
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
import { COLORS } from "../../../constants";

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
			<ScrollView contentContainerStyle={postStyles.sectionHeader}>
				<ProgressBar />
				<Text>review post here</Text>
				<View>
					<ImageViewer
						placeholderImageSource={placeholder}
						selectedImage={postData.imageURIs}
					></ImageViewer>
				</View>

				<View style={styles.textContainer}>
					<View style={styles.rowContainer}>
						<View style={styles.labels}>
							<Text style={styles.labelText}>Description:</Text>
						</View>
						<View style={styles.values}>
							<Text>{postData.description}</Text>
						</View>
					</View>

					<View style={styles.rowContainer}>
						<View style={styles.labels}>
							<Text style={styles.labelText}>Location:</Text>
						</View>
						<View style={styles.values}>
							<Text>hello</Text>
						</View>
					</View>

					<View style={styles.rowContainer}>
						<View style={styles.labels}>
							<Text style={styles.labelText}>Filters:</Text>
						</View>
						<View style={styles.values}>
							<Text>
								{postData.tags.perishable} {postData.tags.diet}{" "}
								{postData.tags.allergens}
							</Text>
						</View>
					</View>
				</View>

				<Tag></Tag>

				<Text>Title: {postData.title} </Text>
				<Text>Description: {postData.description}</Text>
				<Text>
					Perishable: {postData.tags.perishable ? "yes" : "no"}
				</Text>
				<Text> Allergens: {postData.tags.allergens.join(", ")}</Text>
				<Text>Diets: {postData.tags.diet.join(", ")}</Text>
				<Text>Location: {postData.location} </Text>
			</ScrollView>
			<Link href="/home" asChild>
				<NextButtonText
					onPress={() => uploadAllImages(postData.imageURIs)}
					text={"Post"}
				/>
			</Link>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	textContainer: {
		width: "100%",
		height: "30%",
	},
	rowContainer: {
		width: "100%",
		height: 50,
		gap: 25,
		flexDirection: "row",
	},
	labels: { flex: 1, justifyContent: "center" },
	labelText: {
		textAlign: "right",
		color: "#485445",
		fontSize: 16,
		fontWeight: "500",
	},
	values: { flex: 2, justifyContent: "center" },
	tagContainer: {
		width: 100,
		height: 50,
		backgroundColor: COLORS.neutral[30],
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.neutral[70],
	},
	tagText: {},
});

const Tag = () => {
	return (
		<View style={styles.tagContainer}>
			<Text style={styles.tagText}>hello</Text>
		</View>
	);
};
