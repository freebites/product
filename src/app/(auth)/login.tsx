import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
} from "react-native";
import { useAuth } from "../../context/auth";
import { Link } from "expo-router";
import React from "react";
import LoginButton from "../../components/login/LoginButton";
import { Welcome } from "../../components";
import { globalStyles } from "../../components/global";

export default function SignIn() {
  return (
    <SafeAreaView style={[globalStyles.container, { alignItems: "center" }]}>
      <Welcome />

      <View style={styles.container}>
        <Link
          href={{ pathname: "/loginPage", params: { login: "true" } }}
          asChild
        >
          <LoginButton text="Login" allowed />
        </Link>

        <Link
          href={{ pathname: "/signupPage", params: { login: "false" } }}
          asChild
        >
          <LoginButton text="Sign Up" allowed />
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
