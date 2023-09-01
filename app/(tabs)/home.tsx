import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native"; // views are divs and text a p tags
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../context/auth";
import { globalStyles } from "../../components/global";
import SearchBar from "../../components/common/SearchBar";

const Home = () => {
	return (
		<SafeAreaView
			style={[globalStyles.container, { flex: 1, alignItems: "center" }]}
		>
			<SearchBar />
			<Text> Home </Text>
		</SafeAreaView>
	);
};

export default Home;
