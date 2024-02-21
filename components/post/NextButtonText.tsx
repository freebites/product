import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { forwardRef } from "react";

const NextButtonText = (props, ref) => {
	return (
		<Pressable
			onPress={props.onPress}
			ref={ref}
			style={({ pressed }) => [
				styles.button,
				// validInput is true so we need to take its opposite here
				{ opacity: pressed || !props.validInput ? 0.5 : 1.0 },
				props.style,
			]}
		>
			<Text>{props.text}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		width: "100%",
		height: 42,
		backgroundColor: "#EDA76E",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
});
export default forwardRef(NextButtonText);
