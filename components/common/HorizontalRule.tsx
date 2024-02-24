import React from "react";
import { View, StyleSheet } from "react-native";

const HorizontalRule = (props: { color?; width? }) => {
	const lineColor = props.color != undefined ? props.color : "black";
	return (
		<View
			style={[
				styles.horizontalRule,
				{ borderBottomColor: lineColor, width: props.width },
			]}
		/>
	);
};

const styles = StyleSheet.create({
	horizontalRule: {
		borderBottomWidth: 1,
		borderBottomColor: "black", // You can set the color according to your design
		width: "100%",
		marginVertical: 10,
	},
});

export default HorizontalRule;
