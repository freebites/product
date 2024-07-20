import { View, Text, StyleSheet, Platform, Alert, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../global";
import ToggleOption from "./ToggleOption";
import BorderLine from "./BorderLine";
import { setItem } from "../../local-storage/asyncStorage";
import Dropdown from "./Dropdown";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const checkmark = require("../../assets/icons/freebites/check.png");

const PhotoAccess = () => {
  const [allPhotos, setAllPhotos] = useState<boolean>(false);
  const [noPhotos, setNoPhotos] = useState<boolean>(false);
  const [selectedPhotos, setSelectedPhotos] = useState<boolean>(false);

  const [status, requestPermission, getPermission] =
    ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS !== "web") {
        const { status, accessPrivileges, canAskAgain } = await getPermission();
        if (status === "granted") {
          if (accessPrivileges === "limited") {
            toggleSwitch("selectedPhotos");
          } else {
            toggleSwitch("allPhotos");
          }
        } else if (status === "denied") {
          toggleSwitch("noPhotos");
        }
      }
    };
    requestPermissions();
  }, []);

  const askPhotoPermissions = async () => {
    // check if user can come back to app after going to settings without restarting app
    Alert.alert(
      "Permission Denied",
      "Photo access permissions are denied. Please enable them in settings.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ]
    );
  };

  const toggleSwitch = (option: string) => {
    setAllPhotos(option === "allPhotos");
    setNoPhotos(option === "noPhotos");
    setSelectedPhotos(option === "selectedPhotos");
  };

  return (
    <View>
      <TouchableOpacity onPress={askPhotoPermissions}>
        <Text style={styles.subTitle}>Photo Access</Text>
        <View style={styles.container}>
          <View style={styles.switchStyle}>
            <Text style={styles.text}>All photos</Text>
            {allPhotos && <Feather name="check" size={24} color="green" />}
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.switchStyle}>
            <Text style={styles.text}>No Photos</Text>
            {noPhotos && <Feather name="check" size={24} color="green" />}
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.switchStyle}>
            <Text style={styles.text}>Only selected photos</Text>
            {selectedPhotos && <Feather name="check" size={24} color="green" />}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#58565D",
  },
  switchStyle: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 29,
    justifyContent: "space-between",
    flexShrink: 0,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "4%",
    marginBottom: "0%",
  },
  image: {
    height: 20,
    width: 20,
  },
  text: {
    fontSize: 12,
    color: "#58565D",
  },
});

export default PhotoAccess;
