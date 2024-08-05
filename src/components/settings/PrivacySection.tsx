import { View, Text, StyleSheet, Platform, Alert, Linking } from "react-native";
import React, { useEffect } from "react";
import { globalStyles } from "../global";
import ToggleOption from "./ToggleOption";
import BorderLine from "./BorderLine";
import { setItem } from "../../local-storage/asyncStorage";
import Dropdown from "./Dropdown";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import PhotoAccess from "./PhotoAccess";
import LocationAccess from "./LocationAccess";
import CameraAccess from "./CameraAccess";

const PrivacySection = () => {
  const askLocationPermissions = async () => {
    // check if user can come back to app after going to settings without restarting app
    Alert.alert(
      "Change privacy in your Settings",
      "Privacy settings are adjustable in the Settings App",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ]
    );
  };
  return (
    <View>
      <Dropdown title="Privacy">
        <TouchableOpacity onPress={askLocationPermissions}>
          <PhotoAccess />
          <LocationAccess />
          <CameraAccess />
        </TouchableOpacity>
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
