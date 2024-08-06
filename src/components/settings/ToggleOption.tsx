import { View, Text, StyleSheet, Switch, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { getItemWithDefault, setItem } from "../../utils/asyncStorage";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";

const checkmark = require("../../assets/icons/freebites/check.png");

interface ToggleOptionProps {
  storageKey: string;
  text: string;
}

const ToggleOption = (props: ToggleOptionProps) => {
  const { storageKey, text } = props;
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  /* Gets the current option from Local Storage */
  useEffect(() => {
    const getOption = async () => {
      const state = await getItemWithDefault<boolean>(storageKey, isEnabled);
      setIsEnabled(state);
    };
    getOption();
  }, []);

  /* Stores the current change to Local Storage */
  const toggleSwitch = async () => {
    setIsEnabled((previousState) => {
      setItem(storageKey, !previousState);
      return !previousState;
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.switchStyle} onPress={toggleSwitch}>
        <Text style={styles.text}>{text}</Text>
        {isEnabled && <Feather name="check" size={24} color="green" />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ToggleOption;
