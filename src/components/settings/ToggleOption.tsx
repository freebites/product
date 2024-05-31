import { View, Text, StyleSheet, Switch } from "react-native";
import React, { useState, useEffect } from "react";
import { getItem, setItem } from "../../local-storage/asyncStorage"



const ToggleOption = (props: { storageKey: string, text: string}) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  useEffect(() => {
    const getOption = async () => {
      const state = await getItem(props.storageKey);
      setIsEnabled((previousState) => state);
    }

    getOption();
  }, []);

  // console.log("new try");
  const toggleSwitch = async () => {
    if (isEnabled) {
      console.log("BEFORE enabled");
    } else {
      console.log("BEFORE false");
    }
    setIsEnabled((previousState) => !previousState);

    if (isEnabled) {
      console.log("AFTER enabled");
    } else {
      console.log("AFTER false");
    }
    setLocalStorage();
  };

  

  const setLocalStorage = async () => {
    try {
      await setItem(props.storageKey, !isEnabled);
      if (isEnabled) {
        console.log("toggle ON after async");
      } else {
        console.log("toggle OFF after async");
      }
      console.log("calling toggle");
    } catch (error: any) {
      console.log("Error updating to local storage: ", error);
    }
  };

  
  
  return (
    <View style={styles.container}>
      <Text>{props.text}</Text>
      <Switch
        style={styles.switchStyle}
        value={isEnabled}
        onValueChange={toggleSwitch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchStyle: {
    display: "flex",
    width: 66,
    height: 29,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "4%",
    marginBottom: "0%",
  },
});

export default ToggleOption;
