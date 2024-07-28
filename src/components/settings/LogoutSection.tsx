import { View, Text } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { useAuth } from "@context/auth";

const LogoutSection = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Link
        asChild
        href={{
          pathname: `/profile/updatePassword`,
        }}
      >
        <Text> Update Password </Text>
      </Link>
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
