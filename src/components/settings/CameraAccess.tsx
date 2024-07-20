import { View, Text, StyleSheet, Platform, Alert, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { globalStyles } from "../global";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const checkmark = require("../../assets/icons/freebites/check.png");

const CameraAccess = () => {
  const [allow, setAllow] = useState<boolean>(false);
  const [status, requestPermission] = useCameraPermissions();
  
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS !== "web") {
        const { status } = await requestPermission();
        if (status === "granted") {
          setAllow(true);
        } else {
          setAllow(false);
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

  return (
    <View>
      <TouchableOpacity onPress={askPhotoPermissions}>
        <Text style={styles.subTitle}>Camera Access</Text>
        <View style={styles.container}>
          <View style={styles.switchStyle}>
            <Text style={styles.text}>Allowed</Text>
            {allow && <Feather name="check" size={24} color="green" />}
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.switchStyle}>
            <Text style={styles.text}>Not Allowed</Text>
            {!allow && <Feather name="check" size={24} color="green" />}
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

export default CameraAccess;
