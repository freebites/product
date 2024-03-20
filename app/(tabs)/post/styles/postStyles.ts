import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

export const postStyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	scrollContainer: {
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	sectionContainer: {
		justifyContent: "center",
		alignItems: "flex-start",
		width: "80%",
	},
	sectionHeader: {
		marginHorizontal: 5,
		color: "black",
		fontSize: 18,
		fontStyle: "normal",
		fontWeight: "500",
		lineHeight: 50 /* 277.778% */,
	},
	pageHeader: {
		color: "black",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "600",
	},
	pageH2: {
		color: COLORS.neutral[90],
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "400",
	},
	pageH3: {
		color: COLORS.brown[30],
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "400",
	},
});
