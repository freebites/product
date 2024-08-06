import { SafeAreaView, TextInput, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "@components/global";
import { getOneUserEmail } from "@api/user/usercrud";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";
import { COLORS } from "../../constants";
import RectangleOrangeButton from "@components/common/RectangleOrangeButton";
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
      if (user !== null) {
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
      <RectangleOrangeButton
        onPress={continuePressed}
        text="Continue"
        disabled={email.length === 0}
        bold
      />
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
    borderBottomColor: COLORS.gray,
  },
  title: {
    color: COLORS.gray,
    alignSelf: "flex-start",
    paddingLeft: "15%",
  },
  button: {
    width: "80%",
    backgroundColor: COLORS.orange[80],
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
