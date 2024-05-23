import { View, Text, StyleSheet, Switch } from "react-native";
import React, { useState } from "react";

const ToggleOption = (props: { text: string }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
