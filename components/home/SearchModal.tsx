import { View, Text, Button, StyleSheet } from "react-native";
import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
// modal callbacks
const bottomSheetModalRef = useRef<BottomSheetModal>(null);

// variables
const snapPoints = useMemo(() => ["25%", "50%"], []);

// callbacks
const handlePresentModalPress = useCallback(() => {
	bottomSheetModalRef.current?.present();
}, []);
const handleSheetChanges = useCallback((index: number) => {
	console.log("handleSheetChanges", index);
}, []);

const SearchModal = forwardRef<BottomSheetModalMethods, any>((props, ref) => {
	// renders

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
	return (
		<View style={styles.container}>
			<Button
				onPress={handlePresentModalPress}
				title="Present Modal"
				color="black"
			/>
			<BottomSheetModal
				ref={ref}
				backdropComponent={renderBackdrop}
				index={1}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
			>
				<BottomSheetView style={styles.contentContainer}>
					<Text>Awesome 🎉</Text>
				</BottomSheetView>
			</BottomSheetModal>
		</View>
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
