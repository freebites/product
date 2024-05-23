import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../global";
import ToggleOption from "./ToggleOption";
import BorderLine from "./BorderLine";

const NotificationSection = () => {
  return (
    <View>
      <Text>Notifications</Text>
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
