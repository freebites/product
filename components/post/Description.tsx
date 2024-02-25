import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const Description = () => {
	return (
		<TextInput
			placeholder="Eg. Big macs, fries, and nuggets from TUSC event."
			placeholderTextColor="#A8A7A6"
			multiline
			numberOfLines={4}
			maxLength={40}
			style={styles.input}
			// onChangeText={(text) => {
			// 	handleUpdateDesc(text);
			// }}
			// value={postData.description}
		></TextInput>
	);
};

const styles = StyleSheet.create({
	input: {
		width: "85%",
		height: 147,
		backgroundColor: "white",
		borderRadius: 20,
		borderColor: "black",
		borderWidth: 1,
		paddingHorizontal: 20,
		paddingTop: 17,
		paddingBottom: 17,
		marginTop: 9,
		marginBottom: 64,
	},
});

export default Description;
