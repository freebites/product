import { View, SafeAreaView, StyleSheet } from "react-native";
import { Link } from "expo-router";
import React from "react";
import Welcome from "@components/home/Welcome";
import { globalStyles } from "@components/global";
import FreebitesButton from "@components/common/FreebitesButton";

export default function SignIn() {
  return (
    <SafeAreaView style={[globalStyles.container, { alignItems: "center" }]}>
      <Welcome />

      <View style={styles.container}>
        <Link
          href={{ pathname: "/loginPage", params: { login: "true" } }}
          asChild
        >
          <FreebitesButton text="Login" allowed />
        </Link>

        <Link
          href={{ pathname: "/signupPage", params: { login: "false" } }}
          asChild
        >
          <FreebitesButton text="Sign Up" allowed bold />
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 23,
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 86,
  },
});
