import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import React from "react";

////////////////////////////////
//// USELESS BUTTON LMAO COME BACK WITH STRATEGY TO REMEMBER PREVIUOS PAGE
//// JUST HARD CODE THE LINKS FIRST
function goBack() {
	router.back();
}

const BackButton = () => {
	return (
		<View>
			<TouchableOpacity style={{ backgroundColor: "red" }}>
				<Text onPress={() => goBack()}>go back</Text>
			</TouchableOpacity>
		</View>
	);
};

export default BackButton;
