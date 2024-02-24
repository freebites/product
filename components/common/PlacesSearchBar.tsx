import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const apiKey = process.env.EXPO_PUBLIC_API_KEY;
/*
 */
const PlacesSearchBar = (props: { onSelected?; onLocationFound? }) => {
	return (
		<GooglePlacesAutocomplete
			placeholder="Search"
			onPress={(data, details = null) => {
				// 'details' is provided when fetchDetails = true
				console.log(data, details);
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
				onFocus: () => props.onSelected(),
			}}
		/>
	);
};

const styles = StyleSheet.create({
	textInputContainer: {
		backgroundColor: "rgba(0,0,0,0)",
		borderTopWidth: 0,
		borderBottomWidth: 0,
		zIndex: 999,
		width: "90%",
	},
	textInput: {
		marginLeft: 0,
		marginRight: 0,
		height: 45,
		color: "#5d5d5d",
		fontSize: 16,
		borderWidth: 1,
		zIndex: 999,
	},
	predefinedPlacesDescription: {
		color: "#1faadb",
	},
	listView: {
		top: 45.5,
		zIndex: 10,
		position: "absolute",
		color: "black",
		backgroundColor: "white",
		width: "89%",
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
});

export default PlacesSearchBar;
