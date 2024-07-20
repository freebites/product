import { View, Text, StyleSheet, Platform } from "react-native";
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
  return (
    <View>
      <Dropdown title="Privacy">
        <PhotoAccess />
        <LocationAccess />
        <CameraAccess />
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
