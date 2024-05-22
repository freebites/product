import { StyleSheet, Pressable, Modal } from "react-native";
import React from "react";

import InfoPopUp from "./InfoPopUp";

export const InfoModal = (props) => {
  return (
    <Modal visible={props.modalVisible} transparent={true} animationType="fade">
      <Pressable style={styles.modalContent}>
        <Pressable>
          <InfoPopUp setModalVisible={props.setModalVisible} />
        </Pressable>
      </Pressable>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    flex: 1.5,
    justifyContent: "flex-end",
  },
});
export default InfoModal;
