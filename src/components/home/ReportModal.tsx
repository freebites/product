import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../../constants/theme";

interface ReportModal {
  reportVisable: boolean,
}

const ReportModal = () => {
  const { reportVisable } = props;
  const { modalVisible, setModalVisible } = useState<boolean>(props.reportVisable);

    return (
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },

  reportContainer: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "100%",
    height: 153,
    paddingVertical: 10,
  },

  cancelButton: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "100%",
    height: 43,
    marginTop: 5,
  },
});

export default ReportModal;
