import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native"; // views are divs and text a p tags
import { useAuth } from "../../../context/auth";
import { globalStyles } from "../../../components/global";

const Profile = () => {
	const { signOut } = useAuth();
	return (
		<SafeAreaView
			style={[globalStyles.container, { alignItems: "center" }]}
		>
			<Text> My Profile </Text>
			<View style={{}}>
				<Text> Personal details </Text>
				<Text> Edit </Text>
			</View>

			<Text onPress={() => signOut()}>Sign Out</Text>
		</SafeAreaView>
	);
};

export default Profile;
