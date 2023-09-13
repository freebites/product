import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import { globalStyles } from "../global";

const leftArrow = require("../../assets/icons/chevron-left.png");

function goBack() {
	router.back();
}

const Header = (props) => {
	return (
		<View
			style={{
				width: "100%",
				alignItems: "baseline",
				flexDirection: "row",
				justifyContent: "flex-start",
				marginTop: "8.7%",
			}}
		>
			<Pressable
				onPress={() => goBack()}
				style={{ marginLeft: "10%", width: "24%" }}
			>
				<Image source={leftArrow} />
			</Pressable>

			<Text style={globalStyles.headerText}>{props.text}</Text>
		</View>
	);
};

export default Header;
