import { View, Text } from "react-native";
//import React from 'react'
const icon = require("../../../assets/icons/freebites/logo.png");

const LoginSection = () => {
	<View>
		{" "}
		<Text>Login</Text>{" "}
	</View>;
};

const SignupSection = () => {
	<View>
		<Text> Sign Up </Text>
	</View>;
};
const signup = () => {
	return (
		<View>
			<View style={{ alignItems: "center" }}>
				<Image source={icon} />
				<Text>signup</Text>
			</View>
		</View>
	);
};

export default signup;
