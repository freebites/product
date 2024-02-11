import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { globalStyles } from "../../../components/global";
import Header from "../../../components/common/Header";
import { useAuth } from "../../../context/auth";


/*
	TODO: 
		- Currently the localParams in this page is the UID
		- For backend, each User should have a [drafts] 
		- Pass [drafts] from profile, display accordingly
*/

const drafts = () => {
	return (
		<SafeAreaView style={globalStyles.container}>
			<Header text="Drafts" />
		</SafeAreaView>
	);
};

export default drafts;
