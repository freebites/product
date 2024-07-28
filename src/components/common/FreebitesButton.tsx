import { Text, StyleSheet, Pressable } from "react-native";
import React, { forwardRef } from "react";
import { COLORS } from "constants/theme";

interface FreebitesButtonProps {
  onPress?: () => void;
  text: string;
  disabled?: boolean;
  bold?: boolean;
}
const FreebitesButton = (props: FreebitesButtonProps, ref: React.Ref<any>) => {
  const { onPress, text, disabled, bold } = props;
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      ref={ref}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        styles.button,
        { backgroundColor: disabled ? "#808080" : COLORS.orange[90] },
      ]}
    >
      <Text style={[styles.text, { fontWeight: bold ? "bold" : "normal" }]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "80%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  text: {
    fontSize: 16,
    color: "#FFFCFA",
  },
});
export default forwardRef(FreebitesButton);
