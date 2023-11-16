import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

// a simple binary select consisting of two buttons that takes in a setState
// for a boolean and is used to set that boolean
const BinarySelect = (props: { onPress?: any }) => {
	// useState, to toggle selection maybe factor out into just the prop later?
	const [leftIsSelected, setLeftSelected] = useState<boolean>(true);

	return (
		<View
			style={{
				flexDirection: "row",
				flexWrap: "wrap",
			}}
		>
			<TouchableOpacity
				onPress={() => {
					setLeftSelected(true);
					props.onPress(true);
				}}
				style={[
					styles.tagButton,
					{ backgroundColor: leftIsSelected ? "lightblue" : "white" },
				]}
			>
				<Text>Perishable</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					setLeftSelected(false);
					props.onPress(false);
				}}
				style={[
					styles.tagButton,
					{ backgroundColor: leftIsSelected ? "white" : "lightblue" },
				]}
			>
				<Text>Non-Perishable</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	tagButton: {
		padding: 10,
		margin: 5,
		borderWidth: 1,
		borderColor: "black",
		borderRadius: 5,
	},
	tagText: {
		color: "black",
	},
});
export default BinarySelect;
