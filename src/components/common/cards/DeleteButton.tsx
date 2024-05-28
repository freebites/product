import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import DeleteModal from "../../home/DeleteModal";

interface DeleteButtonProps {
  // text: string;
  onPress: () => void;
}

const DeleteButton = (props: DeleteButtonProps) => {
  const { onPress } = props;

  return (
    <Pressable onPress={() => DeleteModal} style={styles.container}>
      {/* <Icon type={"entypo"} name={"trash"}></Icon> */}
      <DeleteModal></DeleteModal>
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
