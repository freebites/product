import { Text, StyleSheet, Pressable } from "react-native";
import React, { forwardRef } from "react";

interface FreebitesButtonProps {
  onPress?: () => void;
  text: string;
  allowed: boolean;
  bold?: boolean;
}
const FreebitesButton = (props: FreebitesButtonProps, ref: React.Ref<any>) => {
  const { onPress, text, allowed, bold } = props;
  return (
    <Pressable
      onPress={allowed ? onPress : undefined}
      ref={ref}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        styles.button,
        { backgroundColor: !allowed ? "#808080" : "#F19D48" },
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
