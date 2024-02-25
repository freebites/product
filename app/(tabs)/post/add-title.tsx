import { Link } from "expo-router";
import React, { useContext } from "react";
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
import PostHeader from "../../../components/post/PostHeader";
const placeholder = require("../../../assets/images/kemal.jpg");
// TODO: add images to context, drafting
const gallery = () => {
	const { postData, updatePostData } = useContext(PostContext);

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

	// handler for updating location (room number)
	const handleUpdateLocation = (locationName) => {
		updatePostData({ ...postData, location: locationName });
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
				style={{ flex: 1 }}
				keyboardVerticalOffset={100}
				behavior={"position"}
			>
				<ScrollView
					keyboardShouldPersistTaps="handled"
					keyboardDismissMode="on-drag"
					contentContainerStyle={{
						alignItems: "center",
						justifyContent: "center",
					}}
					alwaysBounceVertical={false}
					style={{ flex: 1 }}
				>
					{/* carousel */}
					<View>
						<ImageViewer
							placeholderImageSource={placeholder}
							selectedImage={postData.imageURIs}
						></ImageViewer>
					</View>

					{/* inputs, modularize these? */}

					<Text>What's in the post?</Text>
					<Text>Give your post a concise description.</Text>

					<Description />

					<Link href="/post/tags" asChild>
						<NextButtonText
							text="Next Step"
							validInput={
								postData.description != "" &&
								postData.title != "" &&
								postData.location != ""
							}
						/>
					</Link>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export const postStyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.neutral[2],
	},
});

export default gallery;
