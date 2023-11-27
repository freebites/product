import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import PlainButton2 from "../common/PlainButton2";
import React from "react";

const GalleryButton = (props) => {
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsMultipleSelection: true,
			aspect: [4, 3],
			quality: 0.2,
			selectionLimit: 5,
		});

		if (!result.canceled) {
			// Loops through all of the images and sets strings of the uri
			let linkArray = [];
			for (let i = 0; i < result.assets.length; i++) {
				// create update array
				linkArray = [...linkArray, result.assets[i].uri];
			}
			props.onPress(linkArray);
		}
	};
	return (
		<View style={{ height: 100, width: 100 }}>
			<TouchableOpacity
				onPress={pickImage}
				style={styles.button}
			></TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	button: {
		width: 80,
		height: 80,
		backgroundColor: "#EDA76E",
		borderRadius: 10,
		borderColor: "white",
		borderWidth: 4,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default GalleryButton;
