import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";

const Header = (props) => {
	return (
		<View style={{ width: "100%", alignItems: "center" }}>
			<Text
				style={{
					paddingTop: "8.7%",
					fontSize: 34,
					color: "#505A4E",
					fontWeight: "bold",
				}}
			>
				{props.text}
			</Text>
		</View>
	);
};

export default Header;
