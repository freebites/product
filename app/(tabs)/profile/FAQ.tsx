import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { globalStyles } from "../../../components/global";
import Header from "../../../components/common/Header";
const FAQ = () => {
	return (
		<SafeAreaView style={globalStyles.container}>
			<Header text="Drafts" />
		</SafeAreaView>
	);
};

export default FAQ;
