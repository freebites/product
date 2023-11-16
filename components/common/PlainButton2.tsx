import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { forwardRef } from "react";

const PlainButton2 = (props, ref) => {
	return (
		<Pressable onPress={props.onPress} ref={ref} style={styles.button}>
			<Text>{props.text}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		width: 200,
		height: 42,
		backgroundColor: "#EDA76E",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
});
export default forwardRef(PlainButton2);
