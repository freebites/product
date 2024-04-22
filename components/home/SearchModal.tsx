import { View, Text, Button, StyleSheet } from "react-native";
import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

const SearchModal = forwardRef<BottomSheetModalMethods, any>((props, ref) => {
	// // ref
	// const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// variables
	const snapPoints = useMemo(() => ["25%", "90%"], []);

	// // callbacks
	// const handlePresentModalPress = useCallback(() => {
	// 	bottomSheetModalRef.current?.present();
	// }, []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	// backdrop component
	const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				appearsOnIndex={1}
				enableTouchThrough={false}
			/>
		),
		[]
	);
	// renders
	return (
		<BottomSheetModal
			ref={ref}
			index={1}
			snapPoints={snapPoints}
			onChange={handleSheetChanges}
			backdropComponent={renderBackdrop}
		>
			<BottomSheetView style={styles.contentContainer}>
				<Text>Awesome 🎉</Text>
			</BottomSheetView>
		</BottomSheetModal>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: "center",
		backgroundColor: "grey",
	},
	contentContainer: {
		flex: 1,
		alignItems: "center",
	},
});

export default SearchModal;
