import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { forwardRef } from "react";
import { AntDesign } from "@expo/vector-icons";
const NextButton = (
	props: { onPress?: any; validInput: boolean; style: any },
	ref
) => {
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
			// disabled={!props.validInput} (RE-ENABLE TO REQUIRE IMAGE)
		>
			<AntDesign name="arrowright" size={36} color="white" />
		</Pressable>
	);
};

export const NextButtonNoLink = (props) => {
	return (
		<Pressable onPress={props.onPress} style={styles.button}></Pressable>
	);
};
const styles = StyleSheet.create({
	button: {
		width: 60,
		height: 60,
		backgroundColor: "#EDA76E",
		borderRadius: 30,
		borderWidth: 2,
		borderColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
});
export default forwardRef(NextButton);
