import { View, SafeAreaView, StyleSheet } from "react-native";
import { Link } from "expo-router";
import React from "react";
import Welcome from "@components/home/Welcome";
import { globalStyles } from "@components/global";
import RectangleOrangeButton from "@components/common/RectangleOrangeButton";

export default function SignIn() {
  return (
    <SafeAreaView style={[globalStyles.container, { alignItems: "center" }]}>
      <Welcome />

      <View style={styles.container}>
        <Link
          href={{ pathname: "/loginPage", params: { login: "true" } }}
          asChild
        >
          <RectangleOrangeButton text="Login" />
        </Link>

        <Link
          href={{ pathname: "/signupPage", params: { login: "false" } }}
          asChild
        >
          <RectangleOrangeButton text="Sign Up" bold />
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
