import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { globalStyles } from "@components/global";
import SignupSection from "@components/login/SignupSection";
import React from "react";
import { COLORS } from "../../constants";

const icon = require("../../assets/icons/freebites/freebites_logo.png");

const signupPage = () => {
  return (
    <SafeAreaView
      style={[
        globalStyles.container,
        { flex: 1, alignItems: "center", width: "100%" },
      ]}
    >
      <KeyboardAvoidingView
        style={{ width: "100%", flex: 1 }}
        behavior={"position"}
      >
        <ScrollView style={{ width: "100%" }}>
          <View style={styles.header}>
            <Image source={icon} style={{ width: 120, height: 136 }} />
            <Text style={styles.title}>SIGN UP</Text>
          </View>

          <SignupSection />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    gap: 15,
    marginTop: 103,
  },
  title: {
    color: COLORS.neutral[90],
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default signupPage;
