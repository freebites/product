import { Text, StyleSheet, Pressable } from "react-native";
import React, { forwardRef } from "react";

interface LoginButtonProps {
  onPress?: () => void;
  text: string;
  allowed: boolean;
}
const LoginButton = (props: LoginButtonProps, ref: React.Ref<any>) => {
  const { onPress, text, allowed } = props;
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
      <Text style={styles.text}>{text}</Text>
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
    fontWeight: "bold",
  },
});
export default forwardRef(LoginButton);
