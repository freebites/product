import React, { useState } from "react";
import { router } from "expo-router";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import { validateRoutePerms } from "@context/auth";
import { globalStyles } from "@components/global";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useAuth } from "@context/auth";
import { auth } from "../../../firebase";
import { getOneUser } from "@api/user/usercrud";
import { COLORS } from "../../constants";

export default function UpdatePassword() {
  validateRoutePerms();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const { user, setUser } = useAuth();

  const [errors, setErrors] = useState<{
    oldError: string;
    newError: string;
    confirmError: string;
  }>({
    oldError: "",
    newError: "",
    confirmError: "",
  });

  const [validated, setValidated] = useState<{
    oldValidated: boolean;
    newValidated: boolean;
    confirmValidated: boolean;
  }>({
    oldValidated: true,
    newValidated: false,
    confirmValidated: false,
  });

  const validateOldPassword = async () => {
    const currentUser = await getOneUser(user.uid);
    const credential = EmailAuthProvider.credential(
      currentUser.emailAddress,
      oldPassword
    );
    if (auth.currentUser) {
      try {
        const newCredential = await reauthenticateWithCredential(
          auth.currentUser,
          credential
        );
        return true;
      } catch (error) {
        return false;
      }
    }
  };

  const validateNewPassword = (password: string) => {
    var regularExpression =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const valid = regularExpression.test(password);

    setValidated((prevState) => ({
      ...prevState,
      newValidated: valid,
    }));

    setErrors((prevState) => ({
      ...prevState,
      newError: valid
        ? ""
        : "Password needs at least 1 number, 1 symbol, 1 capital, and between 8-16 characters",
    }));

    if (valid) {
      setNewPassword(password);
    }
  };

  const validateConfirmPassword = (password: string) => {
    const valid = password === newPassword;

    setValidated((prevState) => ({
      ...prevState,
      confirmValidated: valid,
    }));

    setErrors((prevState) => ({
      ...prevState,
      confirmError: valid ? "" : "New Password does not match",
    }));
  };

  const submitPressed = async () => {
    const oldCheck = await validateOldPassword();
    if (oldCheck != null) {
      setValidated((prevState) => ({
        ...prevState,
        oldValidated: oldCheck,
      }));
    }
    if (oldCheck && validated.newValidated && validated.confirmValidated) {
      if (auth.currentUser) {
        updatePassword(auth.currentUser, newPassword);
      }
      router.replace("/home");
    } else {
      setErrors((prevState) => ({
        ...prevState,
        oldError: oldCheck ? "" : "Incorrect password",
      }));
    }
  };

  const colorFunc = (valid: boolean) => {
    if (valid) {
      return "black";
    } else {
      return COLORS.error[70];
    }
  };

  return (
    <SafeAreaView style={[globalStyles.container, { alignItems: "center" }]}>
      <Text style={styles.labelText}>Current Password:</Text>
      <TextInput
        style={[styles.textInput, { color: colorFunc(validated.oldValidated) }]}
        placeholder="current password"
        keyboardType="default"
        textContentType="password"
        onChangeText={(old) => {
          setOldPassword(old);
        }}
      />
      <Text style={styles.errorText}>{errors.oldError}</Text>

      <Text style={styles.labelText}>New Password:</Text>

      <TextInput
        style={[styles.textInput, { color: colorFunc(validated.newValidated) }]}
        placeholder="new password"
        keyboardType="default"
        textContentType="newPassword"
        onChangeText={(newpass) => {
          validateNewPassword(newpass);
        }}
      />
      <Text style={styles.errorText}>{errors.newError}</Text>
      <Text style={styles.labelText}>Confirm New Password:</Text>

      <TextInput
        style={[
          styles.textInput,
          { color: colorFunc(validated.confirmValidated) },
        ]}
        placeholder="confirm new password"
        keyboardType="default"
        textContentType="newPassword"
        onChangeText={(confirm) => {
          validateConfirmPassword(confirm);
        }}
      />
      <Text style={styles.errorText}>{errors.confirmError}</Text>

      <Pressable
        onPress={() => submitPressed()}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
          },
          styles.button,
        ]}
      >
        <Text>Update</Text>
      </Pressable>
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
    marginVertical: 10,
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
  labelText: {
    fontSize: 14,
    textAlign: "left",
    width: "70%",
    marginTop: 20,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.error[70],
    textAlign: "left",
    width: "70%",
  },
});
