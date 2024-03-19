import { View, SafeAreaView, KeyboardAvoidingView } from "react-native";
import { useAuth } from "../../context/auth";
import { Link } from "expo-router";
import React from "react";
import LoginButton from "../../components/login/LoginButton";
import { Welcome } from "../../components";
import { globalStyles } from "../../components/global";

export default function SignIn() {
  const { signIn, user } = useAuth();
  return (
    <SafeAreaView style={[globalStyles.container, { alignItems: "center" }]}>
      <Welcome />

      <View
        style={{
          gap: 23,
          flex: 1,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Link
          href={{
            pathname: "/signup",
            params: { login: true },
          }}
          asChild
        >
          <LoginButton text="login" />
        </Link>

        <Link
          href={{
            pathname: "/signup",
            params: { login: false },
          }}
          asChild
        >
          <LoginButton text="sign up" />
        </Link>
      </View>
    </SafeAreaView>
  );
}
