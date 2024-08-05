import { View, Text, StyleSheet, Platform, Alert, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../global";
import { setItem } from "../../local-storage/asyncStorage";
import {
  useForegroundPermissions,
  requestForegroundPermissionsAsync,
  PermissionStatus,
} from "expo-location";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const checkmark = require("../../assets/icons/freebites/check.png");

const LocationAccess = () => {
  const [always, setAlways] = useState<boolean>(false);
  const [none, setNone] = useState<boolean>(false);

  const [status, requestPermission] = useForegroundPermissions();

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS !== "web") {
        const response = await requestForegroundPermissionsAsync();
        if (response.status === PermissionStatus.GRANTED) {
          toggleSwitch("allowed");
        } else {
          toggleSwitch("not allowed");
        }
      }
    };
    requestPermissions();
  }, []);

  const toggleSwitch = (option: string) => {
    setAlways(option === "allowed");
    setNone(option === "not allowed");
  };

  return (
    <View>
      <Text style={styles.subTitle}>Location tracker</Text>
      <View style={styles.container}>
        <View style={styles.switchStyle}>
          <Text style={styles.text}>Always</Text>
          {always && <Feather name="check" size={24} color="green" />}
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.switchStyle}>
          <Text style={styles.text}>None</Text>
          {none && <Feather name="check" size={24} color="green" />}
        </View>
      </View>
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
