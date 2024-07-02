import { View, Text, StyleSheet } from "react-native";
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
        <Text style={styles.subTitle}>Posts</Text>
        <ToggleOption storageKey="allNotification" text="All notifications" />
        <ToggleOption storageKey="livePosts" text="Only live posts" />
        <ToggleOption storageKey="onlyFavs" text="Only favorites" />
        <Text style={[styles.subTitle, { marginTop: 10 }]}>Comments</Text>
      </Dropdown>
    </View>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#58565D",
  },
});

export default NotificationSection;
