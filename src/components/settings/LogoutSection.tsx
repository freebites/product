import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "../../context/auth";

const LogoutSection = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Text onPress={() => signOut()} style={{ marginVertical: "10%" }}>
        Log Out
      </Text>
      <Text style={{ color: "#E28B8A", fontWeight: "bold" }}>
        Delete Account
      </Text>
    </View>
  );
};

export default LogoutSection;
