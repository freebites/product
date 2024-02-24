import React from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const PlacesSearchBar = () => {
	return (
		<View style={{ zIndex: 1, height: 50, width: "80%" }}>
			<GooglePlacesAutocomplete
				placeholder="Search"
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(data, details);
				}}
				query={{
					key: `${apiKey}`,
					language: "en",
				}}
				onFail={(error) => {
					console.log(error);
				}}
			/>
		</View>
	);
};

export default PlacesSearchBar;
