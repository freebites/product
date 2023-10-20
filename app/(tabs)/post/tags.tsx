import { View, Text, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import React from "react";
import BackButton from "../../../components/common/BackButton";

const tags = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <BackButton />
      <Link href="/(tabs)/home">Post</Link>
    </SafeAreaView>
  );
};

export default tags;
