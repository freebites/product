import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import LoginButton from "./LoginButton";
import { useAuth } from "../../context/auth";
import { useState } from "react";
import React from "react";
import { Link } from "expo-router";
import { COLORS } from "../../constants";
import Svg, { Circle, Rect } from "react-native-svg";
import CheckBox from '@react-native-community/checkbox';

const logo = require("../../assets/icons/freebites/logo.png");
const checkbox = require("../../assets/icons/checkbox.png");

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
      <View style={styles.form}>
        {/* Your other components */}
        <Text style={styles.title}>Username</Text>
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
        <View
          style={{ flex: 1, flexDirection: "row", gap: 16, paddingLeft: 30 }}
        >
          {/* <Image
            source={checkbox}
            style={{ width: 16, height: 16, alignSelf: "flex-start" }}
          /> */}
          {/* <CheckBox
          disabled={true}
          // value={this.state.value0}
          // onValueChange={(value) =>
            // this.setState({
            //   value0: value,
            // })
          }
          /> */}

          
          <View style={{ flex: 1, flexDirection: "row", gap: 89 }}>
            <Text
              style={{
                color: COLORS.neutral[70],
              }}
            >
              Remember me
            </Text>
            <Link
              href={{ pathname: "/signupPage" }}
              style={{ color: COLORS.neutral[70], alignSelf: "flex-end" }}
            >
              <Text>Forgot password?</Text>
            </Link>
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          marginBottom: 20,
          width: "100%",
          alignItems: "center",
          gap: 12,
          marginTop: 36,
        }}
      >
        <LoginButton
          onPress={() => {
            signIn(email, password);
          }}
          text="Get Started"
        />

        <Text style={{ color: COLORS.neutral[70] }}>
          Don't have an account?{" "}
          <Link
            href={{ pathname: "/signupPage" }}
            style={{
              textDecorationLine: "underline",
              color: COLORS.neutral[70],
            }}
          >
            <Text>Sign Up</Text>
          </Link>
        </Text>
      </View>
    </View>
    // </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    width: "100%",
    maxHeight: "70%",
  },
  textInput: {
    width: 330,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.neutral[50],
    backgroundColor: "#F3F2F2",
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  title: {
    color: COLORS.neutral[100],
    alignSelf: "flex-start",
    paddingLeft: "8%",
    fontSize: 14,
  },
});
export default LoginSection;
