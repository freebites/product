import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../../constants/theme";

interface ReportModal {
  reportVisible: boolean;
  setReportVisible: () => void;
}

export const ReportModal = (props: ReportModal) => {
  const { reportVisible, setReportVisible } = props;
  const [submitted, setSubmitted] = useState<boolean>(false);

  console.log("reportVisible: " + reportVisible);
  // console.log("modalVisible: " + modalVisible);
  return (
    <Modal
      animationIn={"slideInUp"}
      animationInTiming={1}
      animationOut={"slideOutDown"}
      animationOutTiming={300}
      isVisible={reportVisible}
      backdropTransitionInTiming={1}
      backdropTransitionOutTiming={300}
      hasBackdrop
      backdropOpacity={0.55}
      // coverScreen
      onBackdropPress={() => {
        setReportVisible();
      }}
      style={styles.modalContainer}
    >
      <View>
        <Text>yippeee</Text>
      </View>
    </Modal>
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
