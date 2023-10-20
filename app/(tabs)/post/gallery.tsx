import { View, Text, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import React from "react";
import BackButton from "../../../components/common/BackButton";

const gallery = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <BackButton />
      <Link href="/post/tags">add tags...</Link>
    </SafeAreaView>
  );
};

export default gallery;
