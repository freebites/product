import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useEffect } from "react";
import { globalStyles } from "../global";
import ToggleOption from "./ToggleOption";
import BorderLine from "./BorderLine";
import { setItem } from "../../local-storage/asyncStorage";
import Dropdown from "./Dropdown";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

const PrivacySection = () => {
  const [status, requestPermission, getPermission] =
    ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS !== "web") {
        const { status, accessPrivileges, canAskAgain } = await getPermission();
        if (status === "granted") {
          console.log("Status granted!");
          if (accessPrivileges === "limited") {
            console.log("but limited!");
          }
        } else if (status === "denied") {
          console.log("Status denied!");
        } else if (status === "undetermined") {
          console.log("Status undetermenied!");
        } else {
          console.log("No clue!");
        }
        if (canAskAgain === true) {
          console.log("Can ASK again");
        }
      }
    };

    requestPermissions();
  }, []);

  const askPhotoPermissions = async () => {
    console.log("askphotopermissions");
    const { status } = await requestPermission();
    if (status === null) {
      console.log("NULL");
    }
  };

  return (
    <View>
      <Dropdown title="Privacy">
        <TouchableOpacity onPress={askPhotoPermissions}>
          <Text style={styles.subTitle}>Photo Access</Text>
          {/* <View style={styles.container}> */}
          {/* <TouchableOpacity style={styles.switchStyle} onPress={toggleSwitch}>
              <Text style={styles.text}>{text}</Text>
              {isEnabled && <Feather name="check" size={24} color="green" />}
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <TouchableOpacity style={styles.switchStyle} onPress={toggleSwitch}>
              <Text style={styles.text}>{text}</Text>
              {isEnabled && <Feather name="check" size={24} color="green" />}
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <TouchableOpacity style={styles.switchStyle} onPress={toggleSwitch}>
              <Text style={styles.text}>{text}</Text>
              {isEnabled && <Feather name="check" size={24} color="green" />}
            </TouchableOpacity>
          </View> */}
          <ToggleOption storageKey="allPhotos" text="All photos" />
          <ToggleOption storageKey="noPhotos" text="No photos" />
          <ToggleOption
            storageKey="selectedPhotos"
            text="Only selected photos"
          />
        </TouchableOpacity>

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
