import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import PlainButton2 from "./PlainButton2";
import React from "react";

////////////////////////////////
//// USELESS BUTTON LMAO COME BACK WITH STRATEGY TO REMEMBER PREVIUOS PAGE
//// JUST HARD CODE THE LINKS FIRST

const galleryButton = (props) => {
	

	return (
		<View>
			<PlainButton2
				onPress={(props.onPress) => {
				}}
				text="Choose from Gallery"
			/>
		</View>

				
	);
};

export default galleryButton;
