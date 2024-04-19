import {
	View,
	Text,
	StyleSheet,
	Pressable,
	useWindowDimensions,
} from "react-native";
import React, { forwardRef } from "react";
import { COLORS } from "../../../constants";
import HorizontalRule from "../../common/HorizontalRule";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Options = (props) => {
	const { height, width } = useWindowDimensions();
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				Would you like to draft or trash this post? If trashed, your
				post will be discarded.
			</Text>
			<View style={styles.optionContainer}>
				<HorizontalRule
					color="rgba(147, 163, 143, 0.40)"
					widthPercentage={93}
					margin={0}
				/>

				<Pressable
					onPress={props.onPress}
					style={({ pressed }) => [
						styles.button,
						// validInput is true so we need to take its opposite here
						{
							backgroundColor: pressed
								? COLORS.neutral[50]
								: "white",
						},
						props.style,
					]}
				>
					<Text style={styles.optionsText}>
						{props.text ? props.text : "Trash"}
					</Text>

					<EvilIcons name="trash" size={30} color="gray" />
				</Pressable>

				<HorizontalRule
					color="rgba(147, 163, 143, 0.40)"
					widthPercentage={93}
				/>

				<Pressable
					onPress={props.onPress}
					style={({ pressed }) => [
						styles.button,
						// validInput is true so we need to take its opposite here
						{
							backgroundColor: pressed
								? COLORS.neutral[50]
								: "white",
						},
					]}
				>
					<Text style={styles.optionsText}>
						{props.text ? props.text : "Draft"}
					</Text>

					<Ionicons name="archive-outline" size={22} color="gray" />
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		width: "100%",
		height: 50,
		alignItems: "center",
		justifyContent: "space-evenly",
		flex: 1,
		flexDirection: "row",
		gap: 180,
	},
	text: {
		color: COLORS.neutral[90],
		fontSize: 14,
		paddingHorizontal: 40,
		paddingVertical: 5,
	},
	container: {
		width: "100%",
		height: 180,
		backgroundColor: "white",
		borderRadius: 20,
		paddingTop: 12,
		marginBottom: 5,
		overflow: "hidden",
	},
	optionContainer: {
		flex: 1,
		marginTop: 11,
	},
	optionsText: {
		color: COLORS.neutral[70],
		fontSize: 16,
		fontWeight: "bold",
	},
});
export default Options;
