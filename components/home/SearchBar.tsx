import { View, Image, StyleSheet, Pressable } from "react-native";
import React, { useCallback, useRef } from "react";
import styled from "styled-components/native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SearchModal from "./SearchModal";

const searchIcon = require("../../assets/icons/freebites/search.png");
const SearchBarStyle = styled.View`
	background: #fffbf9;
	border-radius: 15px;
	width: 83%;
	height: 7%;
	display: flex;
	flex-shrink: 0;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 20.1%;
`;

const SearchBarInput = styled.TextInput`
	color: black;
	flex: 1;
	max-width: 90%;
	height: 100%;
`;

const imageStyle = StyleSheet.create({
	stretch: {
		resizeMode: "contain",
	},
	filterIcon: {},
});

const SearchBar = () => {
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	return (
		<SearchBarStyle>
			<View
				style={{
					height: "100%",
					justifyContent: "center",
					paddingLeft: "4%",
					alignItems: "flex-end",
				}}
			>
				<Image source={searchIcon} style={imageStyle.stretch} />
			</View>
			<SearchBarInput />
			<View
				style={{
					height: "100%",
					justifyContent: "center",
					paddingRight: "4%",
					alignItems: "flex-end",
				}}
			>
				<Pressable
					style={imageStyle.filterIcon}
					onPress={handlePresentModalPress}
				>
					<Image
						style={[imageStyle.stretch]}
						source={require("../../assets/icons/freebites/filter.png")}
					/>
				</Pressable>
				<SearchModal ref={bottomSheetModalRef} />
			</View>
		</SearchBarStyle>
	);
};

export default SearchBar;
