import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import {
	Image,
	View,
	StyleSheet,
	Pressable,
	TouchableOpacity,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import SearchModal from "./SearchModal";
import { getGeolocationWithPlaceID } from "../../api/util/maps";

const apiKey = process.env.EXPO_PUBLIC_API_KEY;
/*
 */

const SearchFilterIcon = () => {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const [isPressed, setIsPressed] = useState(false);

	return (
		<Pressable
			style={styles.RightComponent}
			onPress={handlePresentModalPress}
			onPressIn={() => setIsPressed(true)} // Set isPressed to true when press starts
			onPressOut={() => setIsPressed(false)} // Reset isPressed when press ends
		>
			<Image
				style={[styles.stretch, { opacity: isPressed ? 0.25 : 1 }]}
				source={require("../../assets/icons/freebites/filter.png")}
			/>
			<SearchModal ref={bottomSheetModalRef} />
		</Pressable>
	);
};

const SearchIcon = () => {
	const searchIcon = require("../../assets/icons/freebites/search.png");
	return <Image source={searchIcon} style={styles.searchIcon} />;
};
const HomeSearchBar = (props: { onSelected?; onLocationFound?; onPress }) => {
	return (
		<GooglePlacesAutocomplete
			placeholder="Search"
			onPress={async (data, details) => {
				// 'details' is provided when fetchDetails = true

				props.onPress(details.geometry.location);
				// props.onLocationFound();
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
			renderLeftButton={() => <SearchIcon />}
			fetchDetails={true}
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
		paddingLeft: 50,
		borderRadius: 0,
		color: "#5d5d5d",
		fontSize: 16,
		borderWidth: 0,
		borderTopLeftRadius: 15,
		borderBottomLeftRadius: 15,
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
		height: 20,
		width: 20,
	},
	searchIcon: {
		resizeMode: "contain",
		height: 20,
		width: 20,
		left: 16,
		top: 9,
		position: "absolute",
		zIndex: 10,
	},
	RightComponent: {
		backgroundColor: "white",
		height: 42,
		width: 42,
		borderTopRightRadius: 15,
		borderBottomRightRadius: 15,
		justifyContent: "center",
	},
});

export default HomeSearchBar;
