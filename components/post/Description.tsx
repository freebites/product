import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const Description = () => {
	return (
		<View>
			<TextInput
				placeholder="Eg. Big macs, fries, and nuggets from TUSC event."
				placeholderTextColor="#A8A7A6"
				multiline
				numberOfLines={4}
				maxLength={40}
				// onChangeText={(text) => {
				// 	handleUpdateDesc(text);
				// }}
				// value={postData.description}
			></TextInput>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		width: 100,
	},
});

export default Description;
