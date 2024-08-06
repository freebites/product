import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React, { forwardRef } from "react";
import { COLORS } from "../../../constants";
import { Feather } from "@expo/vector-icons";

const CancelButton = (props, ref) => {
  const { height, width } = useWindowDimensions();
  return (
    <Pressable
      onPress={props.onPress}
      ref={ref}
      style={({ pressed }) => [
        styles.button,
        // validInput is true so we need to take its opposite here
        {
          backgroundColor: pressed ? COLORS.neutral[50] : "white",
        },
        props.style,
      ]}
    >
      <Text style={styles.text}>{props.text ? props.text : "Cancel"}</Text>

      <Feather name="x" size={24} color="gray" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 45,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    flexDirection: "row",
    gap: 170,
  },
  text: {
    color: COLORS.neutral[70],
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default forwardRef(CancelButton);
