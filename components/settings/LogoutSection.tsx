import { View, Text } from "react-native";
import React from "react";
import { HeaderText, SettingsText } from "./styles";
import { useAuth } from "../../context/auth";

const LogoutSection = () => {
	const { signOut } = useAuth();
	return (
		<View>
			<HeaderText
				onPress={() => signOut()}
				style={{ marginVertical: "30%" }}
			>
				Log Out
			</HeaderText>
			<SettingsText style={{ color: "#E28B8A" }}>
				Delete Account
			</SettingsText>
		</View>
	);
};

export default LogoutSection;
