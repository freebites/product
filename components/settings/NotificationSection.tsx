import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../global";
import ToggleOption from "./ToggleOption";
import { HeaderText } from "./styles";

const NotificationSection = () => {
  return (
    <View>
      <HeaderText>Notifications</HeaderText>
      <View style={{ margin: "2%" }} />
      <ToggleOption />
      <ToggleOption />
      <ToggleOption />
    </View>
  );
};

export default NotificationSection;
