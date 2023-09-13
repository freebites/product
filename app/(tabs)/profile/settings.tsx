import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { globalStyles } from "../../../components/global";
import Header from "../../../components/common/Header";
const settings = () => {
	return (
		<SafeAreaView style={globalStyles.container}>
			<Header text="Settings" />
		</SafeAreaView>
	);
};

export default settings;
