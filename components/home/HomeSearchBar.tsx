import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { Image, View, StyleSheet, Pressable } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const apiKey = process.env.EXPO_PUBLIC_API_KEY;
/*
 */

const SearchFilterIcon = () => {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	return (
		<Pressable style={styles.filterIcon} onPress={handlePresentModalPress}>
			<Image
				style={styles.stretch}
				source={require("../../assets/icons/freebites/filter.png")}
			/>
		</Pressable>
	);
};

const HomeSearchBar = (props: { onSelected?; onLocationFound?; onPress? }) => {
	return (
		<GooglePlacesAutocomplete
			placeholder="Search"
			onPress={(data, details = null) => {
				// 'details' is provided when fetchDetails = true
				props.onPress(data.place_id);
				props.onLocationFound();
			}}
			query={{
				key: `${apiKey}`,
				language: "en",
			}}
			onFail={(error) => {
				console.log(error);
			}}
			requestUrl={{
				useOnPlatform: "web",
				url: "https://maps.googleapis.com/maps/api",
			}}
			styles={styles}
			textInputProps={{
				onFocus: props.onSelected ? () => props.onSelected() : () => {}, // do nothing if it doesn't exist lol
			}}
			enablePoweredByContainer={false}
			renderRightButton={() => <SearchFilterIcon />}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 21,
		zIndex: 10,
		overflow: "visible",
		height: 42,
		flexGrow: 0,
		flexShrink: 0,
		marginBottom: 60,
	},
	textInputContainer: {
		backgroundColor: "rgba(0,0,0,0)",
		borderTopWidth: 0,
		borderBottomWidth: 0,
		zIndex: 999,
		width: "92%",
	},
	textInput: {
		height: 42,
		borderRadius: 15,
		color: "#5d5d5d",
		fontSize: 16,
		borderWidth: 0,
	},
	predefinedPlacesDescription: {
		color: "#1faadb",
	},
	listView: {
		top: 60,
		zIndex: 100,
		borderRadius: 10,
		position: "absolute",
		color: "black",
		backgroundColor: "white",
		width: "92%",
	},

	separator: {
		flex: 1,
		backgroundColor: "blue",
	},
	description: {
		flexDirection: "row",
		flexWrap: "wrap",
		fontSize: 14,
		maxWidth: "89%",
	},
	stretch: {
		resizeMode: "contain",
	},
	filterIcon: {},
});

export default HomeSearchBar;
