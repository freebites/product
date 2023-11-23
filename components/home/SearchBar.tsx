import { View, Image, StyleSheet } from "react-native";
import React from "react";
import styled from "styled-components/native";

const searchIcon = require("../../assets/icons/freebites/search.png");
const SearchBarStyle = styled.View`
	background: #fffbf9;
	border-radius: 30px;
	width: 83%;
	height: 4.8%;
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
`;

const imageStyle = StyleSheet.create({
	stretch: {
		height: "43%",
		resizeMode: "contain",
	},
});

const SearchBar = () => {
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
				<Image
					style={[imageStyle.stretch]}
					source={require("../../assets/icons/freebites/filter.png")}
				/>
			</View>
		</SearchBarStyle>
	);
};

export default SearchBar;
