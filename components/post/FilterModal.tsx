import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import FilterPopUp from "./FilterPopUp";

const FilterModal = ({ isVisible, children, onClose }) => {
	return (
		<Modal animationType="fade" visible={isVisible} transparent={true}>
			<View style={styles.modalContent}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Choose a sticker</Text>
					<Pressable onPress={onClose}>
						<MaterialIcons name="close" color="#fff" size={22} />
					</Pressable>
				</View>
				<FilterPopUp />
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContent: {
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
	titleContainer: {
		height: "16%",
		backgroundColor: "#464C55",
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		color: "#fff",
		fontSize: 16,
	},
	pickerContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 50,
		paddingVertical: 20,
	},
});

export default FilterModal;
