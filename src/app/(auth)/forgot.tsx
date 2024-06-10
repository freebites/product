import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import { useAuth } from "../../context/auth";
import { Link } from "expo-router";
import React, { useState } from "react";
import LoginButton from "../../components/login/LoginButton";
import { Welcome } from "../../components";
import { globalStyles } from "../../components/global";
// import { TextInput } from "react-native-gesture-handler";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const continuePressed = () => {
    console.log(email);

    if (isValidEmail(email)) {
      console.log("yay");
    }
  };

  return (
    <SafeAreaView style={[globalStyles.container, { alignItems: "center" }]}>
      <Text>
        Enter the email associated with your account and we'll send you a link
        to reset your password.
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder=""
        keyboardType="email-address"
        textContentType="emailAddress"
        onChangeText={(newEmail) => {
          setEmail(newEmail);
          //   console.log(email);
        }}
      />
      <LoginButton onPress={continuePressed} text="Continue" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    maxHeight: "60%",
    marginBottom: "3%",
  },
  textInput: {
    minWidth: 150,
    width: "70%",
    borderBottomWidth: 1,
    borderBottomColor: "#9e9797",
  },
  title: {
    color: "#9e9797",
    alignSelf: "flex-start",
    paddingLeft: "15%",
  },
  button: {
    width: "80%",
    backgroundColor: "#EDA76E",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  text: {
    fontSize: 13,
  },
});
