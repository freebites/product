import { View, Text, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import BackButton from "../../../components/common/BackButton";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "../../../components/common/ImageViewer";

const placeholder = require("../../../assets/images/kemal.jpg");
// TODO: add images to context
const gallery = () => {
	const [images, setImages] = useState([]);

	// This is the function that lets opens the phone gallery and pick image
	// Use async to load images first before doing anything
	// https://docs.expo.dev/tutorial/image-picker/
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsMultipleSelection: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			// Loops through all of the images and sets strings of the uri
			for (let i = 0; i < result.assets.length; i++) {
				// Use function inside setImages b/c we have to wait for all images to update
				setImages((images) => [...images, result.assets[i].uri]);
			}
		}
	};

	return (
		<SafeAreaView
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Text onPress={pickImage}>Choose from gallery</Text>
			<View style={{ flex: 1, backgroundColor: "red" }}>
				<ImageViewer
					placeholderImageSource={placeholder}
					selectedImage={images}
				></ImageViewer>
			</View>
			<BackButton />
			<Link href="/post/tags">add tags...</Link>
		</SafeAreaView>
	);
};

export default gallery;
