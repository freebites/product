import {
	View,
	Text,
	StyleSheet,
	Pressable,
	useWindowDimensions,
} from "react-native";
import React, { forwardRef } from "react";
import { COLORS } from "../../../constants";

const Options = (props) => {
	const { height, width } = useWindowDimensions();
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				Would you like to draft or trash this post? If trashed, your
				post will be discarded.
			</Text>
			<Pressable
				onPress={props.onPress}
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
		</View>
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
		color: COLORS.neutral[90],
	},
	container: {
		width: "100%",
		height: "42%",
		backgroundColor: "white",
		borderRadius: 20,
		paddingTop: 12,
	},
});
export default Options;
