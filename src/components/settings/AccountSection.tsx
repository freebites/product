import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { globalStyles } from "../global";
import { Link } from "expo-router";
import ToggleOption from "./ToggleOption";
import BorderLine from "./BorderLine";
import { setItem } from "../../local-storage/asyncStorage";
import Dropdown from "./Dropdown";
import { useAuth } from "../../context/auth";

const AccountSection = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Dropdown title="Account">
        <Link
          asChild
          href={{
            pathname: `/profile/updatePassword`,
          }}
        >
          <Text> Change password </Text>
        </Link>
        <ToggleOption storageKey="changeUsername" text="Change username" />
        <Text onPress={() => signOut()} style={{ marginVertical: 10 }}>
          Log Out
        </Text>
      </Dropdown>
    </View>
  );
};

export default AccountSection;
