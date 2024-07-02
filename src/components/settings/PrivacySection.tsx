import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { globalStyles } from "../global";
import ToggleOption from "./ToggleOption";
import BorderLine from "./BorderLine";
import { setItem } from "../../local-storage/asyncStorage";
import Dropdown from "./Dropdown";

const PrivacySection = () => {
  return (
    <View>
      <Dropdown title="Privacy">
        <Text style={styles.subTitle}>Photo Access</Text>
          <ToggleOption storageKey="allPhotos" text="All photos" />
          <ToggleOption storageKey="noPhotos" text="No photos" />
          <ToggleOption storageKey="selectedPhotos" text="Only selected photos" />
        <Text style={styles.subTitle}>Location Tracker</Text>
          <ToggleOption storageKey="alwaysOn" text="Always on" />
          <ToggleOption storageKey="whileUsing" text="Only while using" />
          <ToggleOption storageKey="never" text="Never" />
        <Text style={styles.subTitle}>Camera Access</Text>
          <ToggleOption storageKey="allowCamera" text="Allow" />
          <ToggleOption storageKey="noCamera" text="Don't Allow" />
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

export default PrivacySection;
