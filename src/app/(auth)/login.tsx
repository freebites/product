import { View, SafeAreaView, KeyboardAvoidingView, Text } from "react-native";
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

      <View style={{ gap: 23, flex: 1, width: "100%", alignItems: "center", marginTop: 86, }}>
        <Link href={{ pathname: "/loginPage", params: { login: "true" } }} asChild>
          <LoginButton text="Login" />
        </Link>

        <Link
          href={{ pathname: "/signupPage", params: { login: "false" } }}
          asChild
        >
          <LoginButton text="Sign Up" />
        </Link>

        {/* <Link href={{ pathname: "/signup" }}>
          <Text>old page</Text>
        </Link> */}
        
      </View>
    </SafeAreaView>
  );
}
