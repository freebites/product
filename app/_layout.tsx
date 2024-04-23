import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack, router } from "expo-router";
import { Provider } from "../context/auth";
import { StatusBar } from "expo-status-bar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { AppContext, AppContextProvider } from "../context/appContext";

// can style statusbar for light/dark mode some time
const Layout = () => {
	return (
		<Provider>
			<AppContextProvider>
				<BottomSheetModalProvider>
					<StatusBar style="dark" />
					<Stack screenOptions={{ headerShown: false }} />
				</BottomSheetModalProvider>
			</AppContextProvider>
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
