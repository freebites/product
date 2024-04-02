import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { COLORS } from "../../constants";
import React from "react";
import SubmitButton from "./SubmitButton";

const FilterPopUp = () => {
	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Text style={styles.caption}>
					What additional filter would you like to add?
				</Text>
				<TextInput
					style={styles.input}
					placeholder="MSG"
					placeholderTextColor={COLORS.neutral[90]}
					multiline
					autoFocus={true}
				></TextInput>
			</View>

			<SubmitButton />
		</View>
	);
};

const styles = StyleSheet.create({
	caption: {
		color: COLORS.neutral[90],
		fontSize: 14,
	},
	inputContainer: {
		width: 360,
		backgroundColor: "white",
		borderColor: "rgba(0, 0, 0, 0.40)",
		borderWidth: 1,
		borderRadius: 19,
		alignItems: "center",
		paddingTop: 30,
		paddingBottom: 14,
	},
	input: {
		backgroundColor: "white",
		width: 335,
		height: 86,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: COLORS.neutral[40],
		marginTop: 20,
		paddingTop: 17,
		paddingBottom: 17,
		paddingHorizontal: 20,
	},
	container: {
		paddingBottom: 5,
		gap: 5,
	},
});

export default FilterPopUp;
