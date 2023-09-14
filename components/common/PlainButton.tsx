import { Image } from "react-native";
import React, { forwardRef } from "react";
import styled from "styled-components/native";

const leftArrow = require("../../assets/icons/chevron-right.png");
const PlainButtonUI = styled.Pressable`
	border-radius: 20px;
	background: #fffbf9;
	display: flex;
	margin: 12px 32px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	min-height: 60px;
`;

const ButtonText = styled.Text`
	font-size: 18px;
	font-weight: bold;
	color: #505a4e;
	margin-left: 30px;
`;

const PlainButton = (props, ref) => {
	return (
		<PlainButtonUI
			onPress={props.onPress}
			style={({ pressed }) => [
				{
					backgroundColor: pressed
						? "rgba(209, 204, 182, 0.3)"
						: "white",
				},
				{ width: props.width, height: props.height },
			]}
			ref={ref}
		>
			<ButtonText>{props.text}</ButtonText>
			<Image source={leftArrow} style={{ marginRight: 18 }}></Image>
		</PlainButtonUI>
	);
};

// need to add forward ref if you want to wrap button in <Link>
export default forwardRef(PlainButton);
