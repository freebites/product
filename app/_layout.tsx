import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack, router } from "expo-router";
import { Provider } from "../context/auth";
import { StatusBar } from "expo-status-bar";
import { Button, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BackButton from "../components/common/BackButton";


// can style statusbar for light/dark mode some time
const Layout = () => {
	return (
		<Provider>
			<StatusBar style="dark" />
			<Stack screenOptions={{ headerShown: false }} />
		</Provider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F0E1D2",
	},
});

export default Layout;
