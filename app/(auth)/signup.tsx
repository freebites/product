import { View, Text, Image } from "react-native";
import { useState } from "react";
import { globalStyles } from "../../components/global";
import { TouchableHighlight } from "react-native-gesture-handler";
import LoginSection from "../../components/LoginSection";
import SignupSection from "../../components/SignupSection";
//import React from 'react'

//import top image icon thingy
const icon = require("../../assets/icons/freebites/logo.png");

// TODO: convert to form and then probably turn it into its own component

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
					<View style={{ width: "30%" }}>
						<TouchableHighlight
							style={{
								borderBottomWidth: 1,
								borderColor: loginSelected
									? "#EDA76E"
									: "transparent",
								alignItems: "center",
							}}
							underlayColor="transparent"
							onPress={() => setLoginSelected(true)}
						>
							<Text>Login</Text>
						</TouchableHighlight>
					</View>

					{/* sets a border width that's normally transparent, 
						and then is tied to the 'loginSelected' boolean 
						TODO: figure out how to animate it, might need 
						a different component for this. Also make more 
						readable  */}
					<View style={{ width: "30%" }}>
						<TouchableHighlight
							style={{
								borderBottomWidth: 1,
								borderColor: !loginSelected
									? "#EDA76E"
									: "transparent",
								alignItems: "center",
							}}
							underlayColor="transparent"
							onPress={() => setLoginSelected(false)}
						>
							<Text>Sign Up</Text>
						</TouchableHighlight>
					</View>
				</View>
			</View>
			{/* toggles between login and sign up section */}
			{loginSelected ? <LoginSection /> : <SignupSection />}
		</View>
	);
};

export default signup;
