import { Link, useFocusEffect } from "expo-router";
import React, { useContext, useEffect } from "react";
import BackButton from "../../../components/common/BackButton";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "../../../components/common/ImageViewer";
import PlainButton2 from "../../../components/common/PlainButton2";
import { PostContext } from "../../../context/postContext";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../../../constants/theme";
import {
	View,
	SafeAreaView,
	TextInput,
	StyleSheet,
	KeyboardAvoidingView,
	Pressable,
	Text,
} from "react-native";
import NextButtonText from "../../../components/post/NextButtonText";
import Description from "../../../components/post/Description";
import { postStyles } from "./styles/postStyles";
import ProgressBar from "../../../components/post/ProgressBar";

const placeholder = require("../../../assets/images/kemal.jpg");
// TODO: add images to context, drafting
const gallery = () => {
	const { progress, updateProgress, postData, updatePostData } =
		useContext(PostContext);
	// update progress on focus instead of just when it rerenders to force refresh
	useFocusEffect(() => {
		updateProgress(0);
	});
	// handler for storing image URIs
	const handleUpdateImages = (imageLinks) => {
		updatePostData({
			...postData,
			imageURIs: imageLinks,
		});
	};

	// handler for clearing images - async function
	// talk with designers about flow for adding images - when is the user
	// able to delete images/how would they?
	const clearImages = async () => {
		await updatePostData({
			...postData,
			imageURIs: [],
		});
	};
	const handleUpdateTitle = (title) => {
		updatePostData({ title: title }); // Update multiple values
	};

	const handleUpdateDesc = (descr) => {
		updatePostData({ description: descr }); // Update multiple values
	};

	// TODO: ADD GOOGLE PLACE ID HERE

	// This is the function that lets opens the phone gallery and pick image
	// Use async to load images first before doing anything
	// https://docs.expo.dev/tutorial/image-picker/
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsMultipleSelection: true,
			aspect: [4, 3],
			quality: 0,
			selectionLimit: 5,
		});

		if (!result.canceled) {
			// Loops through all of the images and sets strings of the uri
			let linkArray = [];
			for (let i = 0; i < result.assets.length; i++) {
				// create update array
				linkArray = [...linkArray, result.assets[i].uri];
			}
			handleUpdateImages(linkArray);
		}
	};

	// function for opening up the camera

	const openCamera = async () => {
		const cameraPerms = await ImagePicker.requestCameraPermissionsAsync();

		if (cameraPerms.granted === false) {
			return;
		}

		const result = await ImagePicker.launchCameraAsync();

		console.log(result);
	};

	return (
		<SafeAreaView style={postStyles.container}>
			{/* keyboard and scrollview are for making the keyboard work 
			    as it was blocking the stuff*/}
			<KeyboardAvoidingView
				style={{ width: "100%", flex: 1 }}
				keyboardVerticalOffset={100}
				behavior={"position"}
			>
				<ScrollView
					keyboardShouldPersistTaps="handled"
					keyboardDismissMode="on-drag"
					contentContainerStyle={postStyles.scrollContainer}
					alwaysBounceVertical={false}
				>
					<ProgressBar />

					{/* carousel */}

					<ImageViewer
						placeholderImageSource={placeholder}
						selectedImage={postData.imageURIs}
					></ImageViewer>

					{/* inputs, modularize these? */}

					<Text style={styles.title}>What's in the post?</Text>
					<Text style={styles.caption}>
						Give your post a concise description.
					</Text>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							width: "80%",
						}}
					>
						<Description />
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
			<Link href="/post/tags" asChild>
				<NextButtonText validInput={false} />
			</Link>
		</SafeAreaView>
	);
};

export const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "600",
		width: 287,
		height: 30,
		textAlign: "left",
		marginTop: 26,
	},
	caption: {
		fontSize: 12,
		fontWeight: "400",
		color: "#535D50",
		width: 287,
		height: 21,
		textAlign: "left",
	},
});

export default gallery;
