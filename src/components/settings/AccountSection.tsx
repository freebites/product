import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { globalStyles } from "../global";
import { Link } from "expo-router";
import ToggleOption from "./ToggleOption";
import BorderLine from "./BorderLine";
import { setItem } from "../../utils/asyncStorage";
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
          style={{ margin: 0 }}
        >
          <Text style={styles.text}> Change password </Text>
        </Link>
        <Link
          asChild
          href={{
            pathname: `/profile/edit`,
          }}
        >
          <Text style={styles.text}> Change username </Text>
        </Link>
        <Text
          onPress={() => signOut()}
          style={[styles.text, { marginLeft: 5, marginBottom: 5 }]}
        >
          Log Out
        </Text>
      </Dropdown>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 25,
    fontSize: 12,
    color: "#58565D",
    marginLeft: 0,
  },
});

export default AccountSection;
