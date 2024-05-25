import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

interface DeleteButtonProps {
  // text: string;
  onPress: () => void;
}

const DeleteButton = (props: DeleteButtonProps) => {
  const { onPress } = props;

  return (
    <Pressable onPress={() => onPress()} style={styles.container}>
      <Icon type={"entypo"} name={"trash"}></Icon>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 25,
  },
});

export default DeleteButton;
