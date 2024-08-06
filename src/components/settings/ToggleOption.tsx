import { View, Text, StyleSheet, Switch } from "react-native";
import React, { useState, useEffect } from "react";
import { getItemWithDefault, setItem } from "../../utils/asyncStorage";

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
      <Text>{text}</Text>
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
