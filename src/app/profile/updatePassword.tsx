import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import { validateRoutePerms } from "../../context/auth";
import { globalStyles } from "../../components/global";
import { updatePassword } from "firebase/auth";
import { useAuth } from "../../context/auth";
import { auth } from "../../../firebase";

export default function UpdatePassword() {
  validateRoutePerms();
  const [newPassword, setNewPassword] = useState<string>("");
  const { user, setUser } = useAuth();

  let old_validated = false;
  let new_validated = false;
  let confirm_validated = false;

  const validateOldPassword = (password: string) => {
    if (user.password === password) {
      old_validated = true;
    } else {
      old_validated = false;
    }
  };

  const validateNewPassword = (password: string) => {
    var regularExpression =
      /^(?=.*[/d])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (regularExpression.test(password)) {
      setNewPassword(password);
      new_validated = true;
    } else {
      console.log(
        "Password needs at least 1 number, 1 symbol, and between 8-16 characters"
      );
      new_validated = false;
    }
  };

  const validateConfirmPassword = (password: string) => {
    if (password === newPassword) {
      //validated
      confirm_validated = true;
    } else {
      console.log("new passwords do not match");
      confirm_validated = false;
    }
  };

  const submitPressed = () => {
    if (old_validated && new_validated && confirm_validated) {
      // const currUser = auth.currentUser;
      // updatePassword(currUser, newPassword);
    } else {
      console.log("validation failed");
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
          validateOldPassword(old);
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
