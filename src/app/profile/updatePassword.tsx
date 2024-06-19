import React, { Component, useState } from "react";
import { router } from "expo-router";

import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import { validateRoutePerms } from "../../context/auth";
import { globalStyles } from "../../components/global";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useAuth } from "../../context/auth";
import { auth } from "../../../firebase";
import { getOneUser } from "../../../api/user/usercrud";
import { getOne } from "../../../api/posts/read";
import { color } from "react-native-elements/dist/helpers";

export default function UpdatePassword() {
  validateRoutePerms();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const { user, setUser } = useAuth();

  const [oldValidated, setOldValidated] = useState<boolean>(true);
  const [newValidated, setNewValidated] = useState<boolean>(false);
  const [confirmValidated, setConfirmValidated] = useState<boolean>(false);

  const [oldError, setOldError] = useState<string>("");
  const [newError, setNewError] = useState<string>("");
  const [confirmError, setConfirmError] = useState<string>("");

  const validateOldPassword = async () => {
    const currentUser = await getOneUser(user.uid);
    const credential = EmailAuthProvider.credential(
      currentUser.emailAddress,
      oldPassword
    );
    // console.log(credential);
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

    if (regularExpression.test(password)) {
      setNewPassword(password);
      setNewValidated(true);
    } else {
      setNewValidated(false);
    }
  };

  const validateConfirmPassword = (password: string) => {
    if (password === newPassword) {
      setConfirmValidated(true);
    } else {
      setConfirmValidated(false);
    }
  };

  const submitPressed = async () => {
    const oldValidated = await validateOldPassword();
    if (oldValidated && newValidated && confirmValidated) {
      if (auth.currentUser) {
        updatePassword(auth.currentUser, newPassword);
      }
      router.replace("/home");
    } else {
      if (!oldValidated) {
        setOldError("Incorrect password");
      } else {
        setOldError("");
      }
      if (!newValidated) {
        setNewError(
          "Password needs at least 1 number, 1 symbol, 1 capital, and between 8-16 characters"
        );
      } else {
        setNewError("");
      }
      if (!confirmValidated) {
        setConfirmError("New Password does not match");
      } else {
        setConfirmError("");
      }
    }
  };

  const colorFunc = (valid: boolean) => {
    if (valid) {
      return "black";
    } else {
      return "red";
    }
  };

  return (
    <SafeAreaView style={[globalStyles.container, { alignItems: "center" }]}>
      <Text style={styles.labelText}>Current Password:</Text>
      <TextInput
        style={[styles.textInput, { color: colorFunc(oldValidated) }]}
        placeholder="current password"
        keyboardType="default"
        textContentType="password"
        onChangeText={(old) => {
          setOldPassword(old);
        }}
      />
      <Text style={styles.errorText}>{oldError}</Text>

      <Text style={styles.labelText}>New Password:</Text>

      <TextInput
        style={[styles.textInput, { color: colorFunc(newValidated) }]}
        placeholder="new password"
        keyboardType="default"
        textContentType="newPassword"
        onChangeText={(newpass) => {
          validateNewPassword(newpass);
        }}
      />
      <Text style={styles.errorText}>{newError}</Text>
      <Text style={styles.labelText}>Confirm New Password:</Text>

      <TextInput
        style={[styles.textInput, { color: colorFunc(confirmValidated) }]}
        placeholder="confirm new password"
        keyboardType="default"
        textContentType="newPassword"
        onChangeText={(confirm) => {
          validateConfirmPassword(confirm);
        }}
      />
      <Text style={styles.errorText}>{confirmError}</Text>

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
    borderBottomColor: "#9e9797",
    marginVertical: 10,
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
  labelText: {
    fontSize: 14,
    textAlign: "left",
    width: "70%",
    marginTop: 20,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    textAlign: "left",
    width: "70%",
  },
});
