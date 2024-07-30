import { Text, StyleSheet, Pressable, useWindowDimensions } from "react-native";
import React, { forwardRef } from "react";
import { COLORS } from "../../constants";
interface SubmitButtonProps {
  onPress: () => void;
  validInput: boolean;
  text?: string;
  style?: any;
}
const SubmitButton = (props: SubmitButtonProps) => {
  const { onPress, validInput, text, style } = props;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        // validInput is true so we need to take its opposite here
        {
          backgroundColor:
            pressed || !validInput ? COLORS.neutral[50] : "white",
        },
        style,
      ]}
      disabled={!validInput}
    >
      <Text style={styles.text}>{text ? text : "Submit"}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 360,
    height: 45,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: COLORS.neutral[20],
  },
});
export default SubmitButton;
