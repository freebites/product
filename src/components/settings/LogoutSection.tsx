import { View, Text } from "react-native";
import React from "react";
import { HeaderText, SettingsText } from "./styles";
import { useAuth } from "../../context/auth";

const LogoutSection = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <HeaderText onPress={() => signOut()} style={{ marginVertical: "10%" }}>
        Log Out
      </HeaderText>
      <SettingsText style={{ color: "#E28B8A", fontWeight: "bold" }}>
        Delete Account
      </SettingsText>
    </View>
  );
};

export default LogoutSection;
