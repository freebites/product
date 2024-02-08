import { Image } from "react-native";
import React, { forwardRef } from "react";
import styled from "styled-components/native";

const leftArrow = require("../../assets/icons/chevron-right.png");

const PlainButtonUIBottom = styled.Pressable`
	background: #fffbf9;
	border: 0.5px solid #d3d3d3;
	border-bottom-right-radius: 20px;
	border-bottom-left-radius: 20px;
	flex: 1;
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


const PlainButtonBottom = (props, ref) => {
	return (
		<PlainButtonUIBottom			
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
		</PlainButtonUIBottom>
	);
};

// need to add forward ref if you want to wrap button in <Link>
export default forwardRef(PlainButtonBottom);