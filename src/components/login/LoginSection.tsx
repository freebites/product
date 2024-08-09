import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import { useAuth } from "@context/auth";
import { useEffect, useState, useCallback } from "react";
import React from "react";
import { Link } from "expo-router";
import { COLORS } from "../../constants";
import Checkbox from "expo-checkbox";
import RectangleOrangeButton from "@components/common/RectangleOrangeButton";
import {
  ErrorCodes,
  ErrorMessage,
} from "../../../packages/freebites-types/ErrorCodes";

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

  const handleLogin = useCallback(async () => {
    try {
      await signIn(email, password);
    } catch (error: any) {
      if (error.code === ErrorCodes.INVALID_EMAIL) {
        setErrorMessage(ErrorMessage.INVALID_EMAIL);
      } else if (error.code === ErrorCodes.WRONG_PASSWORD) {
        setErrorMessage(ErrorMessage.INVALID_PASSWORD);
      } else if (error.code === ErrorCodes.INVALID_CREDENTIAL) {
        setErrorMessage(ErrorMessage.INVALID_EMAIL);
      } else {
        setErrorMessage(ErrorMessage.INVALID_CREDENTIAL);
      }
    }
  }, [email, password, signIn]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

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
        <Text style={styles.title}>Username</Text>
        <TextInput
          style={[
            styles.textInput,
            errorMessage == ErrorMessage.INVALID_CREDENTIAL ||
            errorMessage == ErrorMessage.INVALID_EMAIL
              ? styles.errorBorder
              : null,
          ]}
          placeholder=""
          keyboardType="email-address"
          textContentType="emailAddress"
          onChangeText={(text) => {
            handleEmail(text);
          }}
        />
        <View style={styles.errorContainer}>
          {errorMessage == ErrorMessage.INVALID_CREDENTIAL ||
          errorMessage == ErrorMessage.INVALID_EMAIL ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </View>
        <Text style={styles.title}>Password</Text>
        <TextInput
          style={[
            styles.textInput,
            errorMessage == ErrorMessage.INVALID_PASSWORD
              ? styles.errorBorder
              : null,
          ]}
          placeholder=""
          secureTextEntry
          autoComplete={Platform.OS === "ios" ? "password-new" : "new-password"}
          onChangeText={(text) => {
            handlePassword(text);
          }}
        />
        <View style={styles.errorContainer}>
          {errorMessage == ErrorMessage.INVALID_PASSWORD ? (
            <Text style={[styles.errorText]}>{errorMessage}</Text>
          ) : null}
        </View>
        <View
          style={{ flex: 1, flexDirection: "row", gap: 16, paddingLeft: 30 }}
        >
          <Checkbox value={isChecked} onValueChange={setIsChecked} />
          {/* Remember me checkbox -> add session/login to async storage */}
          <View style={styles.rememberContainer}>
            <Text
              style={{
                color: COLORS.neutral[70],
              }}
            >
              Remember me
            </Text>
            <Link
              href={{ pathname: "/forgot" }}
              style={{
                color: COLORS.neutral[70],
                paddingRight: "10%",
              }}
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
        <RectangleOrangeButton
          onPress={handleLogin}
          text="Get Started"
          disabled={email.length === 0 || password.length === 0}
          bold
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
    paddingRight: "11%",
  },
  errorContainer: {
    minHeight: 10,
  },
  rememberContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default LoginSection;
