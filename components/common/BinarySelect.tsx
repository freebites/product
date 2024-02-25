import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import TagButton from "../post/TagButton";

// a simple binary select consisting of two buttons that takes in a setState
// for a boolean and is used to set that boolean
const BinarySelect = (props: { onPress?: any }) => {
	// useState, to toggle selection maybe factor out into just the prop later?
	const [leftIsSelected, setLeftSelected] = useState<boolean>(true);

	return (
		<View style={styles.container}>
			<TagButton
				onPress={() => {
					setLeftSelected(true);
					props.onPress(true);
				}}
				color={undefined}
				tag="Perishable"
				isSelected={leftIsSelected}
			/>

			<TagButton
				onPress={() => {
					setLeftSelected(false);
					props.onPress(false);
				}}
				color={undefined}
				tag="Non-Perishable"
				isSelected={!leftIsSelected}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "flex-start",
		width: "100%",
	},
});
export default BinarySelect;
