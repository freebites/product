import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

const { width, height } = Dimensions.get("window");

const containerWidth = 0.8 * width;
export const postStyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: COLORS.neutral[20],
	},
	scrollContainer: {
		alignItems: "center",
		justifyContent: "center",
		flexGrow: 1,
	},
	scrollContainer2: {
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	sectionContainer: {
		justifyContent: "flex-start",
		alignItems: "flex-start",
		width: containerWidth,
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
		marginTop: 26,
		marginBottom: 9,
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
