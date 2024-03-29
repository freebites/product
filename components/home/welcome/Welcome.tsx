import React from "react";
import { View, Text, Image } from "react-native";

const icon = require("../../../assets/icons/freebites/logo.png");
const image = require("../../../assets/images/title.png");
// import styles from './welcome-style'

const Welcome = () => {

	return (
		<View style={{ alignItems: "center", paddingTop: "17.7%" }}>
			<Image source={icon} />
			<Image source={image} />
			<Text style={{ color: "#96A391" }}>
				food tastes better when it's free{" "}
			</Text>
		</View>
	);

};

export default Welcome;
