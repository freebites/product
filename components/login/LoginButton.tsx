import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { forwardRef } from "react";

const LoginButton = (props, ref) => {
	return (
		<Pressable
			onPress={props.onPress}
			ref={ref}
			style={({ pressed }) => [
				{
					opacity: pressed ? 0.5 : 1,
				},
				styles.button,
			]}
		>
			<Text>{props.text}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		width: "80%",
		backgroundColor: "#EDA76E",
		borderRadius: 100,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		paddingHorizontal: 32,
		paddingVertical: 16,
	},
	text: {
		fontSize: 13,
	},
});
export default forwardRef(LoginButton);
