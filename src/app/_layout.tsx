import React from "react";
import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Provider } from "../context/auth";
import { StatusBar } from "expo-status-bar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { AppContextProvider } from "../context/appContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// can style statusbar for light/dark mode some time
const Layout = () => {
  return (
    <Provider>
      <GestureHandlerRootView>
        <AppContextProvider>
          <BottomSheetModalProvider>
            <StatusBar style="dark" />
            <Stack screenOptions={{ headerShown: false }} />
          </BottomSheetModalProvider>
        </AppContextProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default Layout;
