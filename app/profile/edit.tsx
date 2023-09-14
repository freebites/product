import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { globalStyles } from "../../components/global";
import EditProfileHeader from "../../components/profile/EditProfileHeader";
import EditProfileInput from "../../components/profile/EditProfileInput";
const edit = () => {
	return (
		<SafeAreaView style={globalStyles.containerLight}>
			<EditProfileHeader />
			<View style={{ margin: "5%" }} />
			<EditProfileInput title="Name" />
			<EditProfileInput title="Username" />
			<EditProfileInput title="Pronouns" />
			<EditProfileInput title="Bio" multiline={true} />
		</SafeAreaView>
	);
};

export default edit;
