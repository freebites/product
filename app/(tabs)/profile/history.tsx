import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { globalStyles } from "../../../components/global";
import Header from "../../../components/common/Header";
import { useAuth, validateRoutePerms } from "../../../context/auth";
import { useGlobalSearchParams } from "expo-router";

/*
	TODO: 
		- Currently the localParams in this page is the UID
		- For backend, each User should have a [postIDs] 
		- Pass in the user's postIDs instead of the whole user object
		- Display each Post
*/

const history = () => {
	const { user } = useAuth();
	const globalParams = useGlobalSearchParams();
	validateRoutePerms(user, globalParams);
	
	return (
		<SafeAreaView style={globalStyles.container}>
			<Header text="History" />
			
			<View style={{ margin: "5%" }}> 
			<Text>{user.email}</Text>
			</View>
		</SafeAreaView>
	);
};

export default history;
