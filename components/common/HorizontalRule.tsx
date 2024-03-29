import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const HorizontalRule = (props: { color?; widthPercentage? }) => {
	const lineColor = props.color != null ? props.color : "black";
	const screenWidth = Dimensions.get("window").width;
	const newWidth =
		props.widthPercentage != null
			? (screenWidth * props.widthPercentage) / 100
			: screenWidth;
	return (
		<View
			style={[
				styles.horizontalRule,
				{ borderBottomColor: lineColor, width: newWidth },
			]}
		/>
	);
};

const styles = StyleSheet.create({
	horizontalRule: {
		borderBottomWidth: 1,
		borderBottomColor: "black", // You can set the color according to your design
		width: "100%",
		height: 1,
		marginVertical: 10,
	},
});

export default HorizontalRule;
