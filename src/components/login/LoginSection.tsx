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
import Checkbox from "expo-checkbox";

const logo = require("../../assets/icons/freebites/logo.png");

const LoginSection = () => {
  const { signIn } = useAuth();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleEmail = (text: string) => {
    setEmail(text.toLowerCase());
  };
  const handlePassword = (text: string) => {
    setPassword(text);
  };
  const handleLogin = async () => {
    try {
      console.log('signing in..."');
      const loginTest = await signIn(email, password);
    } catch (error) {
      console.error("fuck you", error);
      setErrorMessage("Incorrect password. Please try again.");
    }

    // .then(() => {
    //   console.log("Sign in successful");
    //   setErrorMessage(""); // Clear previous errors
    // })
    // .catch((error) => {
    //   console.error("Error signing in:", error);
    //   setErrorMessage("Incorrect password. Please try again.");
    //   // if error = auth/too-many-requests
    //   // return/set state of a conditionally rendered component that'll tell the user that they've signed in too many times
    //   // make this red under the login field
    // });
  };

  return (
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
          style={[
            styles.textInput,
            errorMessage ? styles.errorBorder : null, // Apply error border if there's an error message
          ]}
          placeholder=""
          secureTextEntry
          autoComplete={Platform.OS === "ios" ? "password-new" : "new-password"}
          onChangeText={(text) => {
            handlePassword(text);
          }}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <View
          style={{ flex: 1, flexDirection: "row", gap: 16, paddingLeft: 30 }}
        >
          <Checkbox value={isChecked} onValueChange={setIsChecked} />
          {/* Remember me checkbox -> add session/login to async storage */}

          <View style={{ flex: 1, flexDirection: "row", gap: 89 }}>
            <Text
              style={{
                color: COLORS.neutral[70],
              }}
            >
              Remember me
            </Text>
            <Link
              href={{ pathname: "/forgot" }}
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
            handleLogin();
          }}
          text="Get Started"
          allowed
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
  errorBorder: {
    borderColor: COLORS.error[70],
  },
  errorText: {
    color: COLORS.error[70],
    marginTop: -10,
    marginBottom: 10,
  },
});
export default LoginSection;
