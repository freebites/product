import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../components/global";
import LoginButton from "../../components/common/Button";
import { useAuth } from "../../context/auth";

//import React from 'react'

//import top image icon thingy
const icon = require("../../assets/icons/freebites/logo.png");

// TODO: convert to form and then probably turn it into its own component
const LoginSection = () => {
	const { signIn } = useAuth();

	return (
		<View style={{ alignItems: "center", width: "100%" }}>
			<Text> LOGIN SECTION </Text>
			<LoginButton onPress={() => signIn()} text="login" />
		</View>
	);
};

// TODO: convert to form and then probably turn it into its own component
const SignupSection = () => {
	const { signIn } = useAuth();

	return (
		<View style={{ alignItems: "center", width: "100%" }}>
			<Text> SIGNUP SECTION </Text>
			<LoginButton onPress={() => signIn()} text="login" />
		</View>
	);
};

const signup = () => {
	const [loginSelected, setLoginSelected] = useState(true);

	return (
		<View
			style={[
				globalStyles.container,
				{ flex: 1, alignItems: "center", width: "100%" },
			]}
		>
			{/* top white card with logo and login/signup options */}
			<View
				style={{
					alignItems: "center",
					width: "100%",
					backgroundColor: "white",
					borderBottomLeftRadius: 30,
					borderBottomRightRadius: 30,
					aspectRatio: 1 / 1,
					paddingTop: "11.7%",
					justifyContent: "space-evenly",
				}}
			>
				{/* icon */}
				<Image source={icon} style={{ width: 169, height: 191 }} />

				{/* login/signup option */}
				<View
					style={{
						flexDirection: "row",
						alignItems: "flex-end",
						justifyContent: "space-evenly",
						width: "100%",
					}}
				>
					<Text onPress={() => setLoginSelected(true)}>Login</Text>
					<Text onPress={() => setLoginSelected(false)}>Sign Up</Text>
				</View>
			</View>
			{/* toggles between login and sign up section */}
			{loginSelected ? <LoginSection /> : <SignupSection />}{" "}
		</View>
	);
};

export default signup;
