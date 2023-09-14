import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { globalStyles } from "../../../components/global";
import Header from "../../../components/common/Header";
import NotificationSection from "../../../components/settings/NotificationSection";
import ContactSection from "../../../components/settings/ContactSection";
import LogoutSection from "../../../components/settings/LogoutSection";
const settings = () => {
	return (
		<SafeAreaView style={globalStyles.container}>
			<View style={{ width: "80%" }}>
				<Header text="Settings" />
				<View style={{ margin: "8%" }} />
				<NotificationSection />
				<View style={{ margin: "8%" }} />
				<ContactSection />
				<LogoutSection />
			</View>
		</SafeAreaView>
	);
};

export default settings;
