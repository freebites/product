import {
	View,
	Text,
	StyleSheet,
	Pressable,
	useWindowDimensions,
} from "react-native";
import React, { forwardRef } from "react";
import { COLORS } from "../../../constants";

const CancelButton = (props, ref) => {
	const { height, width } = useWindowDimensions();
	return (
		<Pressable
			onPress={props.onPress}
			ref={ref}
			style={({ pressed }) => [
				styles.button,
				// validInput is true so we need to take its opposite here
				{
					backgroundColor: pressed ? COLORS.neutral[50] : "white",
				},
				props.style,
			]}
		>
			<Text style={styles.text}>
				{props.text ? props.text : "Next Step"}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		width: "100%",
		height: 45,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: COLORS.neutral[70],
	},
});
export default forwardRef(CancelButton);
