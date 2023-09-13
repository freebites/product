import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { globalStyles } from "../../components/global";
import EditProfileHeader from "../../components/profile/EditProfileHeader";
import Header from "../../components/common/Header";
const edit = () => {
	return (
		<SafeAreaView style={globalStyles.containerLight}>
			<EditProfileHeader />
			<Header text="Edit Profile" />
		</SafeAreaView>
	);
};

export default edit;
