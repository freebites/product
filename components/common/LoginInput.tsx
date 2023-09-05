import { Text, View, Image, StyleSheet, FlexStyle } from "react-native";
import React from "react";
import styled from "styled-components/native";

const LoginInputUI = styled.View`
	height: 5vh;
	width: 72%;
	display: "block";
`;

const StyledInput = styled.TextInput`
	color: black;
	display: block;
	border-bottom-width: 1px;
	border-bottom-color: #9e9797;
	height: 10%;
	padding: 1.75vh;
`;

const LoginInput = (props) => {
	const inputType = props.isPassword ? "password" : "text";

	return (
		<LoginInputUI>
			<Text style={{ color: "#9e9797" }}>{props.title}</Text>
			<View>
				<StyledInput
					secureTextEntry={inputType === "password"}
					keyboardType={
						inputType === "password" ? "default" : "email-address"
					}
				/>
			</View>
		</LoginInputUI>
	);
};

export default LoginInput;
