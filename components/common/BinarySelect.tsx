import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import TagButton from "../post/TagButton";

// a simple binary select consisting of two buttons that takes in a setState
// for a boolean and is used to set that boolean
const BinarySelect = (props: { onPress?: any }) => {
	// useState, to toggle selection maybe factor out into just the prop later?
	const [perishable, setPerishable] = useState<string>("perishable");

	return (
		<View style={styles.container}>
			<TagButton
				onPress={() => {
					setPerishable("perishable");
					props.onPress("perishable");
				}}
				color={undefined}
				tag="Perishable"
				isSelected={perishable == "perishable"}
			/>

			<TagButton
				onPress={() => {
					setPerishable("non-perishable");
					props.onPress("non-perishable");
				}}
				color={undefined}
				tag="Non-Perishable"
				isSelected={perishable == "non-perishable"}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		width: "100%",
	},
});
export default BinarySelect;
