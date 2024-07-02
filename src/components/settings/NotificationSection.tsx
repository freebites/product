import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { globalStyles } from "../global";
import ToggleOption from "./ToggleOption";
import BorderLine from "./BorderLine";
import { setItem } from "../../local-storage/asyncStorage";
import Dropdown from "./Dropdown";

const NotificationSection = () => {
  return (
    <View>
      <Dropdown title="Notifications">
        <ToggleOption storageKey="allNotification" text="All notifications" />
        <ToggleOption storageKey="livePosts" text="Only live posts" />
        <ToggleOption storageKey="onlyFavs" text="Only favorites" />
      </Dropdown>

      <View style={{ paddingTop: 40 }}>
        <BorderLine />
      </View>
    </View>
  );
};

export default NotificationSection;
