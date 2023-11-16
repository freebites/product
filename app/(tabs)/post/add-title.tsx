import { Link } from "expo-router";
import React, { useContext } from "react";
import BackButton from "../../../components/common/BackButton";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "../../../components/common/ImageViewer";
import PlainButton2 from "../../../components/common/PlainButton2";
import { PostContext } from "../../../context/postContext";
import { ScrollView } from "react-native-gesture-handler";
import { Camera, CameraType } from "expo-camera";

import {
	View,
	SafeAreaView,
	TextInput,
	StyleSheet,
	KeyboardAvoidingView,
	Pressable,
	Text,
} from "react-native";
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
			quality: 1,
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
			console.log("fuck u");
			return;
		}

		const result = await ImagePicker.launchCameraAsync();

		console.log(result);
	};

	return (
		<SafeAreaView
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
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
				>
					<PlainButton2
						onPress={() => {
							pickImage(); // pick images here
						}}
						text="Choose from Gallery"
					/>

					<PlainButton2
						onPress={() => {
							openCamera(); // pick images here
						}}
						text="Take Picture	"
					/>
					{/* carousel */}
					<View>
						<ImageViewer
							placeholderImageSource={placeholder}
							selectedImage={postData.imageURIs}
						></ImageViewer>
					</View>

					<Pressable
						onPress={() => {
							clearImages();
						}}
					></Pressable>

					<BackButton />

					{/* inputs, modularize these? */}
					<TextInput
						placeholder="Add Food Name"
						placeholderTextColor="#94A38F"
						value={postData.title}
						onChangeText={(text) => {
							handleUpdateTitle(text);
						}}
					></TextInput>

					<TextInput
						placeholder="Add Location"
						placeholderTextColor="#94A38F"
						value={postData.location}
						onChangeText={(text) => {
							handleUpdateLocation(text);
						}}
					></TextInput>

					<TextInput
						placeholder="Write a description for each food item. Please include the name of the restaurant its from if you can！"
						placeholderTextColor="#94A38F"
						multiline
						numberOfLines={4}
						maxLength={40}
						onChangeText={(text) => {
							handleUpdateDesc(text);
						}}
						value={postData.description}
					></TextInput>

					<Link href="/post/tags" asChild>
						<PlainButton2 text="Next Step" />
					</Link>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default gallery;
