import { TouchableOpacity, Text, StyleSheet } from "react-native";

// takes in a string take, an onPress function and an isSelected boolean
// that determines whether it is selected or not.
const TagButton = ({ tag, onPress, isSelected }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[
				styles.tagButton,
				{ backgroundColor: isSelected ? "lightblue" : "white" },
			]}
		>
			<Text style={styles.tagText}>{tag}</Text>
		</TouchableOpacity>
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

export default TagButton;
