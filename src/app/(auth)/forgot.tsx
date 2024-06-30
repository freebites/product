import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import LoginButton from "../../components/login/LoginButton";
import { globalStyles } from "../../components/global";
import { getOneUserEmail } from "../../../api/user/usercrud";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const continuePressed = async () => {
    if (isValidEmail(email)) {
      const newEmail = email.toLowerCase();
      const user = await getOneUserEmail(newEmail);
      if (user != null) {
        sendPasswordResetEmail(auth, newEmail)
          .then(() => {
            setErrorMessage("Email Sent");
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        setErrorMessage("no user with this email address.");
      }
    } else {
      setErrorMessage("invalid email format");
    }
  };

  useEffect(() => {});

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
        }}
      />
      <Text>{errorMessage}</Text>
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