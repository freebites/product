import { View, Text, StyleSheet, Switch } from "react-native";
import React, { useState, useEffect } from "react";
import { getItem, setItem } from "../../local-storage/asyncStorage";

const ToggleOption = (props: { storageKey: string; text: string }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  /* Gets the current option from Local Storage */
  useEffect(() => {
    const getOption = async () => {
      const state = await getItem(props.storageKey);
      setIsEnabled((previousState) => state);
    };

    getOption();
  }, []);

  /* Stores the current change to Local Storage */
  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);
    await setItem(props.storageKey, !isEnabled);
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
