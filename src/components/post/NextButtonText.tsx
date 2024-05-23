import {
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  View,
} from "react-native";
import React, { forwardRef } from "react";
import { COLORS } from "../../constants";

interface NextButtonTextProps {
  onPress?: () => void;
  validInput: boolean;
  text?: string;
  style?: object;
}
const NextButtonText = forwardRef<View, NextButtonTextProps>((props, ref) => {
  const { onPress, validInput, text, style } = props;
  const { height, width } = useWindowDimensions();
  return (
    <Pressable
      onPress={onPress}
      ref={ref}
      style={({ pressed }) => [
        styles.button,
        // validInput is true so we need to take its opposite here
        {
          backgroundColor:
            pressed || !validInput ? COLORS.neutral[40] : COLORS.orange[90],
          bottom: 0.072 * height + 21,
        },
        style,
      ]}
      disabled={!validInput} // disabled if there is NO valid input
    >
      <Text style={styles.text}>{text ?? "Next Step"}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    width: "80%",
    height: 42,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: COLORS.neutral[20],
  },
});
export default NextButtonText;
