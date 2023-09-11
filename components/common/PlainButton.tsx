import { Image } from "react-native";
import React from "react";
import styled from "styled-components/native";

const leftArrow = require("../../assets/icons/chevron-left.png");
const PlainButtonUI = styled.TouchableOpacity`
	border-radius: 20px;
	background: #fffbf9;
	display: flex;
	margin: 12px 32px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
`;

const ButtonText = styled.Text`
	font-size: 18px;
	font-weight: bold;
	color: #505a4e;
	margin-left: 30px;
`;

const PlainButton = (props) => {
	return (
		<PlainButtonUI
			onPress={props.onPress}
			style={{ width: props.width, height: props.height }}
		>
			<ButtonText>{props.text}</ButtonText>
			<Image source={leftArrow} style={{ marginRight: 18 }}></Image>
		</PlainButtonUI>
	);
};
export default PlainButton;
