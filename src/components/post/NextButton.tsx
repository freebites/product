import { StyleSheet, Pressable } from "react-native";
import React, { forwardRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native-reanimated/lib/typescript/Animated";
interface NextButtonProps {
  onPress?: () => void;
  validInput: boolean;
  style: any;
}
const NextButton = forwardRef<View, NextButtonProps>(
  (props: NextButtonProps, ref) => {
    const { onPress, validInput, style } = props;
    return (
      <Pressable
        onPress={onPress}
        ref={ref}
        style={({ pressed }) => [
          styles.button,
          // validInput is true so we need to take its opposite here
          { opacity: pressed || !validInput ? 0.5 : 1.0 },
          style,
        ]}
        // disabled={!props.validInput} (RE-ENABLE TO REQUIRE IMAGE)
      >
        <AntDesign name="arrowright" size={36} color="white" />
      </Pressable>
    );
  }
);

export const NextButtonNoLink = (onPress: () => void) => {
  return <Pressable onPress={onPress} style={styles.button}></Pressable>;
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    backgroundColor: "#EDA76E",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default NextButton;
