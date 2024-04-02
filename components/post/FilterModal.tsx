import {
	Modal,
	View,
	Text,
	StyleSheet,
	Pressable,
	KeyboardAvoidingView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import FilterPopUp from "./FilterPopUp";

const FilterModal = ({ isVisible, children, onClose }) => {
	return (
		<Modal animationType="fade" visible={isVisible} transparent={true}>
			<Pressable style={styles.modalContent} onPress={onClose}>
				{/* wrap in pressable w/ no action to prevent onClose from firing while
            tapping the actual content 
          */}
				<KeyboardAvoidingView behavior="position">
					<Pressable>
						<FilterPopUp />
					</Pressable>
				</KeyboardAvoidingView>
			</Pressable>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContent: {
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		justifyContent: "center",
		alignItems: "center",
	},
	titleContainer: {
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
