import React, { useState } from "react";
import { SafeAreaView, TextInput, StyleSheet } from "react-native";
import { validateRoutePerms } from "../../context/auth";
import { globalStyles } from "../../components/global";

export const UpdatePassword = () => {
  validateRoutePerms();
  const [newPassword, setNewPassword] = useState<string>("");

  const validateOldPassword = (password: string) => {};

  const validateNewPassword = (password: string) => {
    var regularExpression =
      /^(?=.*[/d])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (regularExpression.test(password)) {
      setNewPassword(password);
    } else {
      console.log(
        "Password needs at least 1 number, 1 symbol, and between 8-16 characters"
      );
    }
  };

  const validateConfirmPassword = (password: string) => {
    if (password === newPassword) {
      //validated
    } else {
      console.log("new passwords do not match");
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
          validateOldPassword(newpass);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="confirm new password"
        keyboardType="default"
        textContentType="newPassword"
        onChangeText={(confirm) => {
          validateOldPassword(confirm);
        }}
      />
    </SafeAreaView>
  );
};

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
