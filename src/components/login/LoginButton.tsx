import { Text, StyleSheet, Pressable } from "react-native";
import React, { forwardRef } from "react";

interface LoginButtonProps {
  onPress?: () => void;
  text: string;
}
const LoginButton = (props: LoginButtonProps, ref: React.Ref<any>) => {
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
};

const styles = StyleSheet.create({
  button: {
    width: "80%",
    backgroundColor: "#EDA76E",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  text: {
    fontSize: 13,
  },
});
export default forwardRef(LoginButton);
