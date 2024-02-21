import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import { globalStyles } from "../global";
import BackButton from "../common/BackButton";

function goBack() {
	router.back();
}

const PostHeader = (props) => {
	return (
		<View
			style={{
				width: "100%",
				alignItems: "baseline",
				flexDirection: "row",
				justifyContent: "flex-start",
				marginTop: "8.7%",
				backgroundColor: "#FFFCFA",
			}}
		>
			<BackButton />

			<Text style={globalStyles.headerText}>{props.text}</Text>
		</View>
	);
};

export default PostHeader;
