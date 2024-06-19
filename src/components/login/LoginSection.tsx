import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import LoginButton from "./LoginButton";
import { useAuth } from "../../context/auth";
import { useState } from "react";
import React from "react";
import { Link } from "expo-router";

const LoginSection = () => {
  const { signIn } = useAuth();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleEmail = (text: string) => {
    setEmail(text);
  };
  const handlePassword = (text: string) => {
    setPassword(text);
  };

  const handleLogin = () => {};
  return (
    // <TouchableWithoutFeedback
    //   onPress={() => Keyboard.dismiss()}
    //   accessible={false}
    // >
    <View
      style={{
        flex: 1,
        alignItems: "center",
        width: "100%",
        paddingTop: "7%",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          maxHeight: "60%",
          paddingBottom: "3%",
        }}
      >
        {/* Your other components */}
        <Text style={styles.title}>Email Address</Text>
        <TextInput
          style={styles.textInput}
          placeholder=""
          keyboardType="email-address"
          textContentType="emailAddress"
          onChangeText={(text) => {
            handleEmail(text);
          }}
        />
        <Text style={styles.title}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder=""
          secureTextEntry
          autoComplete={Platform.OS === "ios" ? "password-new" : "new-password"}
          onChangeText={(text) => {
            handlePassword(text);
          }}
        />
      </View>

      <View
        style={{
          justifyContent: "center",
          marginBottom: 20,
          width: "100%",
          alignItems: "center",
        }}
      >
        {/* LoginButton */}
        <LoginButton
          onPress={() => {
            signIn(email, password);
          }}
          text="Login"
        />
        <Link href="/forgot">Forgot password?</Link>
      </View>
    </View>
    // </TouchableWithoutFeedback>
  );
};
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
});
export default LoginSection;
