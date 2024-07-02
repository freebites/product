import { useState } from "react";
import { View, StyleSheet } from "react-native";
import TagButton from "../post/TagButton";
import React from "react";

// a simple binary select consisting of two buttons that takes in a setState
// for a boolean and is used to set that boolean
const BinarySelect = (props: { onPress?: any }) => {
  const { onPress } = props;
  // useState, to toggle selection maybe factor out into just the prop later?
  const [perishable, setPerishable] = useState<string>("Perishable");

  return (
    <View style={styles.container}>
      <TagButton
        onPress={() => {
          setPerishable("Perishable");
          onPress("Perishable");
        }}
        color={undefined}
        tag="Perishable"
        isSelected={perishable === "Perishable"}
      />

      <TagButton
        onPress={() => {
          setPerishable("Nonperishable");
          onPress("Nonperishable");
        }}
        color={undefined}
        tag="Nonperishable"
        isSelected={perishable === "Nonperishable"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  },
});
export default BinarySelect;
