import { View, Text } from "react-native";
import React from "react";
import { Link, router } from "expo-router";

export default function reviewpost() {
	return (
		<View style={{ alignItems: "center", justifyContent: "center" }}>
			<Text>review post here</Text>
			<Link href="/(tabs)/home">Submit Post</Link>
		</View>
	);
}
