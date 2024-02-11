import { Image, View, StyleSheet } from "react-native";
import React, { forwardRef } from "react";
import styled from "styled-components/native";

const leftArrow = require("../../assets/icons/chevron-right.png");
const PlainButtonUI = styled.Pressable`
	background: #fffbf9;
	border: 0.5px solid #d3d3d3;
    flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	min-height: 60px;

`;


const ButtonText = styled.Text`
	font-size: 18px;
	font-weight: bold;
	color: #505a4e;
	margin-left: 30px;
	flex: 1;
`;

const styles = StyleSheet.create({
	button :{
		flexDirection: "row",
		alignContent: "center",
		justifyContent: "space-between",
		minHeight: 60,
	},
	buttonText : {
		fontSize: 18,
		fontWeight: "bold",
	},
	arrow : {
		marginRight: 20,
	}
})


const PlainButton = (props, ref) => {
	return (
		<PlainButtonUI
			onPress={props.onPress}
			// style={({ pressed }) => [
			// 	{
			// 		backgroundColor: pressed
			// 			? "rgba(209, 204, 182, 0.3)"
			// 			: "white",
			// 	},
			// 	{ width: props.width, height: props.height },
			// ]}
			style = {styles.button}
			ref={ref}
		>

			<ButtonText style = {styles.buttonText}>{props.text}</ButtonText>
			<Image source={leftArrow} style={styles.arrow}></Image>

			
		</PlainButtonUI>
	);
	};



// need to add forward ref if you want to wrap button in <Link>
export default forwardRef(PlainButton);

