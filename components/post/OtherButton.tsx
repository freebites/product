import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OtherButton = (props) => {
	return (
		<TouchableOpacity
			style={styles.tagButton}
			onPress={() => props.onPress()}
		>
			<MaterialCommunityIcons name="pencil" size={16} color="gray" />
			<Text style={styles.tagText}>Other</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	tagButton: {
		paddingHorizontal: 16,
		paddingVertical: 6,
		margin: 5,
		width: 95,
		flexDirection: "row",
		gap: 6,
		borderWidth: 1,
		borderColor: `${COLORS.neutral[70]}`,
		borderRadius: 10,
	},
	tagText: {
		color: COLORS.neutral[90],
		margin: 0,
	},
});

export default OtherButton;
