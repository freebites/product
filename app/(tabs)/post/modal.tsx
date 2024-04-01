import { View, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import PlainButton2 from "../../../components/common/PlainButton2";
import CancelButton from "../../../components/post/PostModal/CancelButton";
import Options from "../../../components/post/PostModal/Options";

/*
 * Modal
 * This is the modal for the drafting feature in the posting section.
 *
 */

export default function Modal() {
	// If the page was reloaded or navigated to directly, then the modal should be presented as
	// a full screen page. You may need to change the UI to account for this.
	const isPresented = router.canGoBack();
	return (
		<View style={styles.modalContainer}>
			{/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}

			{/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
			<StatusBar style="light" />
			<View style={styles.modalContent}>
				<Options />
				<Link href="../" asChild>
					<CancelButton text="Cancel" />
				</Link>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
	modalContent: {
		width: "93%",
		alignItems: "center",
	},
});
