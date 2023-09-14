import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../global";
import ToggleOption from "./ToggleOption";
import { HeaderText, SettingsText } from "./styles";

const ContactSection = () => {
	return (
		<View>
			<HeaderText>Contact Us</HeaderText>
			<SettingsText style={{ marginTop: "5%", fontSize: 16 }}>
				Contact us at FreeBites@gmail.com!
			</SettingsText>
		</View>
	);
};

export default ContactSection;
