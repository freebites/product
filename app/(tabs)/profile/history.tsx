import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { globalStyles } from "../../../components/global";
import Header from "../../../components/common/Header";


const history = () => {
	return (
		<SafeAreaView style={globalStyles.container}>
			<Header text="History" />
			<View style={{ margin: "5%" }} />
		</SafeAreaView>
	);
};

export default history;
