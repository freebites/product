import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { globalStyles } from "../../../components/global";
import Header from "../../../components/common/Header";
import NotificationSection from "../../../components/settings/NotificationSection";
import AccountSection from "../../../components/settings/AccountSection";
import ContactSection from "../../../components/settings/ContactSection";
import LogoutSection from "../../../components/settings/LogoutSection";
import PrivacySection from "../../../components/settings/PrivacySection";
import HelpSection from "../../../components/settings/HelpSection";
import AboutSection from "../../../components/settings/AboutSection";
import { validateRoutePerms } from "../../../context/auth";
import { ScrollView } from "react-native-gesture-handler";
const settings = () => {
  validateRoutePerms();

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header text="Settings" />
      <ScrollView style={{ width: "80%" }} showsVerticalScrollIndicator={false}>
        <AccountSection />
        <NotificationSection />
        <PrivacySection />
        <HelpSection />
        <AboutSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default settings;
