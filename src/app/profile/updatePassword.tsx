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
import { getOne } from "../../../api/posts/read";

export default function UpdatePassword() {
  validateRoutePerms();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const { user, setUser } = useAuth();

  // const [oldValidated, setOldValidated] = useState<boolean>(false);
  const [newValidated, setNewValidated] = useState<boolean>(false);
  const [confirmValidated, setConfirmValidated] = useState<boolean>(false);

  const validateOldPassword = async () => {
    const currentUser = await getOneUser(user.uid);
    // console.log(currentUser.emailAddress);
    console.log(oldPassword);
    const credential = EmailAuthProvider.credential(
      currentUser.emailAddress,
      oldPassword
    );
    // console.log(credential);
    if (auth.currentUser) {
      console.log(auth.currentUser);
      try {
        const newCredential = await reauthenticateWithCredential(
          auth.currentUser,
          credential
        );
        // setOldValidated(true);
        console.log("authenticated ");
        return true;
      } catch (error) {
        console.log(error);
        console.log("could not authenticate");
        return false;
      }
      // reauthenticateWithCredential(auth.currentUser, credential)
      //   .then(() => {
      //     // User re-authenticated.
      //     console.log("authenticated");
      //     setOldValidated(true);
      //   })
      //   .catch((error) => {
      //     // An error ocurred
      //     // ...
      //     console.log("error");
      //     setOldValidated(false);
      //   });
    }
  };

  const validateNewPassword = (password: string) => {
    var regularExpression =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (regularExpression.test(password)) {
      console.log("New password works: " + password);
      setNewPassword(password);
      setNewValidated(true);
      console.log(newValidated);
    } else {
      console.log(
        "Password needs at least 1 number, 1 symbol, 1 capital, and between 8-16 characters"
      );
      setNewValidated(false);
    }
  };

  const validateConfirmPassword = (password: string) => {
    console.log("confirm password field: " + password);
    console.log("password to match: " + newPassword);
    if (password === newPassword) {
      //validated
      setConfirmValidated(true);
    } else {
      console.log("new passwords do not match");
      setConfirmValidated(false);
    }
  };

  const submitPressed = async () => {
    const oldValidated = await validateOldPassword();
    console.log(oldValidated);
    if (oldValidated && newValidated && confirmValidated) {
      if (auth.currentUser) {
        updatePassword(auth.currentUser, newPassword);
      }
      console.log("validation success");
      router.replace("/home");
    } else {
      console.log("validation failed");
      console.log(oldValidated);
      console.log(newValidated);
      console.log(confirmValidated);
    }
  };

  return (
    <SafeAreaView style={[globalStyles.container, { alignItems: "center" }]}>
      <TextInput
        style={styles.textInput}
        placeholder="current password"
        keyboardType="default"
        textContentType="password"
        onChangeText={(old) => {
          setOldPassword(old);
          // validateOldPassword(old);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="new password"
        keyboardType="default"
        textContentType="newPassword"
        onChangeText={(newpass) => {
          validateNewPassword(newpass);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="confirm new password"
        keyboardType="default"
        textContentType="newPassword"
        onChangeText={(confirm) => {
          validateConfirmPassword(confirm);
        }}
      />

      <Pressable
        onPress={() => submitPressed()}
        // ref={ref}
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
