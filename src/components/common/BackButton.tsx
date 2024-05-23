import { View, Text, TouchableOpacity, Pressable, Image } from "react-native";
import { router } from "expo-router";
import React from "react";

import { AntDesign } from "@expo/vector-icons";
////////////////////////////////
//// USELESS BUTTON LMAO COME BACK WITH STRATEGY TO REMEMBER PREVIUOS PAGE
//// JUST HARD CODE THE LINKS FIRST
function goBack() {
	router.back();
}

const BackButton = (props) => {
	return (
		<Pressable
			onPress={() => goBack()}
			style={{ marginLeft: props.marginLeft ? props.marginLeft : 0 }}
		>
			<AntDesign name="left" size={19} color="black" />
		</Pressable>
	);
};

export default BackButton;
