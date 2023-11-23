import { Text, View, Image, StyleSheet, FlexStyle } from "react-native";
import React from "react";
import styled from "styled-components/native";

const LoginInputUI = styled.View`
	max-height: 15%;
	width: 72%;
	flex: 1;
	display: block;
`;

const StyledInput = styled.TextInput`
	color: black;
	border-bottom-width: 1px;
	border-bottom-color: #9e9797;
	padding: 3%;
`;

const LoginInput = (props) => {
	const inputType = props.isPassword ? "password" : "text";

	return (
		<LoginInputUI style={{ flex: 1 }}>
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
