import React, { useState } from "react";
import { Alert, StyleSheet, Text, Pressable, View, Image } from "react-native";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";
import CancelButton from "../post/PostModal/CancelButton";

interface FreeBitesConfirmationModalProps {
  headText: string;
  modalVisible: boolean;
  setModalVisible: () => void;
  pressEffect: boolean;
  onPress: () => void;
}

function FreeBitesConfirmationModal(props: FreeBitesConfirmationModalProps) {
  const { headText, modalVisible, setModalVisible, pressEffect, onPress } =
    props;

  return (
    <View>
      <Modal
        animationIn={"slideInUp"}
        animationInTiming={400}
        animationOut={"slideOutDown"}
        animationOutTiming={300}
        isVisible={modalVisible}
        backdropTransitionOutTiming={0}
        hasBackdrop
        backdropOpacity={0.55}
        coverScreen
        onBackdropPress={setModalVisible}
        style={styles.modalContainer}
      >
        <View style={styles.bottomView}>
          <Image
            source={require("../../assets/icons/freebites/FreeBitesLogoSmall.png")}
            style={styles.imgStyle}
          />
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{headText}</Text>
          </View>
        </View>
        <Pressable
          style={styles.button}
          onPress={async () => {
            setModalVisible();

            if (pressEffect) {
              onPress();
            }
          }}
        >
          <Text>I got it!</Text>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  imgStyle: {
    width: 46,
    height: 52,
    marginBottom: 10,
  },
  modalContainer: {
    justifyContent: "flex-end",
  },
  bottomView: {
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    height: 153,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 15,
    paddingBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "orange",
    width: "100%",
    height: 45,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 170,
  },
  buttonOpen: {
    backgroundColor: "#000",
  },
  textStyle: {
    color: "#79767D",
    fontWeight: "500",
    textAlign: "left",
    paddingLeft: 15,
    fontSize: 16,
  },
  modalText: {
    paddingLeft: 25,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "#58565D",
    fontSize: 14,
  },
});

export default FreeBitesConfirmationModal;
