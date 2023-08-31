import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native"; // views are divs and text a p tags
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../context/auth";
import { globalStyles } from "../../components/global";
const Home = () => {
	return (
		<SafeAreaView
			style={[globalStyles.container, { alignItems: "center" }]}
		>
			<Text> Home </Text>
		</SafeAreaView>
	);
};

export default Home;
