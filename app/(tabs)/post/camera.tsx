import { View, Text, SafeAreaView } from "react-native";
import { Link, router } from "expo-router";
import React from "react";
import BackButton from "../../../components/common/BackButton";

const camera = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <BackButton />
      <Link href="/post/gallery">go to gallery</Link>
    </SafeAreaView>
  );
};

export default camera;
