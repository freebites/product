import React, { useState } from "react";
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

    if (regularExpression.test(password)) {
      setNewPassword(password);
      setValidated((prevState) => ({
        ...prevState,
        newValidated: true,
      }));
    } else {
      setValidated((prevState) => ({
        ...prevState,
        newValidated: false,
      }));
    }
  };

  const validateConfirmPassword = (password: string) => {
    if (password === newPassword) {
      setValidated((prevState) => ({
        ...prevState,
        confirmValidated: true,
      }));
    } else {
      setValidated((prevState) => ({
        ...prevState,
        confirmValidated: false,
      }));
    }
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
      if (!oldCheck) {
        setErrors((prevState) => ({
          ...prevState,
          oldError: "Incorrect password",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          oldError: "",
        }));
      }
      if (!validated.newValidated) {
        setErrors((prevState) => ({
          ...prevState,
          newError:
            "Password needs at least 1 number, 1 symbol, 1 capital, and between 8-16 characters",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          newError: "",
        }));
      }
      if (!validated.confirmValidated) {
        setErrors((prevState) => ({
          ...prevState,
          confirmError: "New Password does not match",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          confirmError: "",
        }));
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
