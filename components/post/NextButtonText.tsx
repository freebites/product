import {
	View,
	Text,
	StyleSheet,
	Pressable,
	useWindowDimensions,
} from "react-native";
import React, { forwardRef } from "react";
import { COLORS } from "../../constants";

const NextButtonText = (props, ref) => {
	const { height, width } = useWindowDimensions();
	return (
		<Pressable
			onPress={props.onPress}
			ref={ref}
			style={({ pressed }) => [
				styles.button,
				// validInput is true so we need to take its opposite here
				{
					backgroundColor:
						pressed || !props.validInput
							? COLORS.neutral[40]
							: COLORS.orange[90],
					bottom: 0.072 * height + 21,
				},
				props.style,
			]}
			disabled={!props.validInput} // disabled if there is NO valid input
		>
			<Text style={styles.text}>
				{props.text ? props.text : "Next Step"}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		position: "absolute",
		width: "80%",
		height: 42,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: COLORS.neutral[20],
	},
});
export default forwardRef(NextButtonText);
