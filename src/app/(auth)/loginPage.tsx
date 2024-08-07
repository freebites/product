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
import LoginSection from "@components/login/LoginSection";
import React from "react";
import { COLORS } from "../../constants";

const icon = require("../../assets/icons/freebites/freebites_logo.png");

const loginPage = () => {
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
            <Text style={styles.title}>LOGIN</Text>
          </View>

          <LoginSection />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// make into component...? (like LoginSection)
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
    marginBottom: 30,
  },
});

export default loginPage;
