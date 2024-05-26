import { Text, StyleSheet, Pressable, View } from "react-native";
import React, { forwardRef } from "react";

interface PlainButton2Props {
  onPress: () => void;
  text: string;
}
const PlainButton2 = forwardRef<View, PlainButton2Props>((props, ref) => {
  const { onPress, text } = props;
  return (
    <Pressable
      onPress={onPress}
      ref={ref}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        styles.button,
      ]}
    >
      <Text>{text}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 42,
    backgroundColor: "#EDA76E",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default PlainButton2;
