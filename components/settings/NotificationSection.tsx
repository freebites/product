import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../global";
import ToggleOption from "./ToggleOption";
import { HeaderText } from "./styles";
import BorderLine from "./BorderLine";

const NotificationSection = () => {
  return (
    <View>
      <HeaderText>Notifications</HeaderText>
      <ToggleOption text="All notifications" />
      <ToggleOption text="Only live posts" />
      <ToggleOption text="Only favorites" />
      <View style={{ paddingTop: 40 }}>
        <BorderLine />
      </View>
    </View>
  );
};

export default NotificationSection;
