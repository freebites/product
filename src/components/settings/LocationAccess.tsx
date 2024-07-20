import { View, Text, StyleSheet, Platform, Alert, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../global";
import { setItem } from "../../local-storage/asyncStorage";
import * as Location from "expo-location";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const checkmark = require("../../assets/icons/freebites/check.png");

const LocationAccess = () => {
  const [whenInUse, setWhenInUse] = useState<boolean>(false);
  const [always, setAlways] = useState<boolean>(false);
  const [none, setNone] = useState<boolean>(false);

  const [status, requestPermission] = Location.useForegroundPermissions();

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS !== "web") {
        const { status, ios} =
          await requestPermission();
        if (status === "granted") {
          if (ios?.scope === "whenInUse") {
            toggleSwitch("whenInUse");
          } else if (ios?.scope === "always") {
            toggleSwitch("always");
          } else if (ios?.scope === "none") {
            toggleSwitch("none");
          } else {
            console.log("fuck we do not know: ", ios?.scope);
          }
        }
        console.log(status);
        if (!ios) {
          console.log("not ios");
        }
      } else {
        console.log("platform is web");
      }
    };
    requestPermissions();
  }, []);

  const askLocationPermissions = async () => {
    // check if user can come back to app after going to settings without restarting app
    Alert.alert(
      "Change Location in you Settings",
      "Photo access permissions are denied. Please enable them in settings.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ]
    );
  };

  const toggleSwitch = (option: string) => {
    setWhenInUse(option === "whenInUse");
    setAlways(option === "always");
    setNone(option === "none");
  };

  return (
    <View>
      <TouchableOpacity onPress={askLocationPermissions}>
        <Text style={styles.subTitle}>Location tracker</Text>
        <View style={styles.container}>
          <View style={styles.switchStyle}>
            <Text style={styles.text}>Always</Text>
            {always && <Feather name="check" size={24} color="green" />}
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.switchStyle}>
            <Text style={styles.text}>While using the app</Text>
            {whenInUse && <Feather name="check" size={24} color="green" />}
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.switchStyle}>
            <Text style={styles.text}>None</Text>
            {none && <Feather name="check" size={24} color="green" />}
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

export default LocationAccess;
