import {
	View,
	Text,
	StyleSheet,
	Pressable,
	useWindowDimensions,
} from "react-native";
import React, { forwardRef } from "react";
import { COLORS } from "../../constants";

const SubmitButton = (props) => {
	const { height, width } = useWindowDimensions();
	return (
		<Pressable
			onPress={props.onPress}
			style={({ pressed }) => [
				styles.button,
				// validInput is true so we need to take its opposite here
				{
					backgroundColor:
						pressed || !props.validInput
							? COLORS.neutral[50]
							: "white",
				},
				props.style,
			]}
			disabled={!props.validInput}
		>
			<Text style={styles.text}>
				{props.text ? props.text : "Submit"}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		width: 360,
		height: 45,
		borderRadius: 20,
		borderColor: "rgba(0, 0, 0, 0.40)",
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: COLORS.neutral[70],
	},
});
export default SubmitButton;
