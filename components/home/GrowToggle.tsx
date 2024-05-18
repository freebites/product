import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

interface GrowToggleProps {
	selected: boolean;
	onPress?: any; // can't think of a better way to support diff onPress functions lol
	text: string;
}

const GrowToggle = (props: GrowToggleProps) => {
	return (
		<Pressable
			style={[
				props.selected ? styles.SelectedStyle : styles.unselectedStyle,
				styles.shadow,
			]}
			onPress={() => props.onPress()}
		>
			<Text
				style={
					props.selected ? styles.SelectedText : styles.unSelectedText
				}
			>
				{props.text}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	SelectedText: {
		color: COLORS.neutral[20],
		fontSize: 15,
		fontWeight: 500,
		fontFamily: "Inter",
	},
	SelectedStyle: {
		alignItems: "center",
		justifyContent: "center",
		width: 120,
		height: 30,
		backgroundColor: COLORS.orange[90],
		borderRadius: 19,
	},
	unSelectedText: {
		color: COLORS.brown[30],
		fontSize: 12,
		fontFamily: "Inter",
	},
	unselectedStyle: {
		alignItems: "center",
		justifyContent: "center",
		width: 96,
		height: 24,
		borderRadius: 15,
		backgroundColor: "#FFFCFA",
	},
	shadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1.25,
		},
		shadowOpacity: 0.3,
		shadowRadius: 2.5,
		elevation: 1, // For Android
	},
	shadow2: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2.5,
		},
		shadowOpacity: 0.15,
		shadowRadius: 7.5,
		elevation: 2.5, // For Android
	},
});
export default GrowToggle;
