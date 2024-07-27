import React, { useState, ReactNode } from "react";
import { Alert, StyleSheet, Text, Pressable, View, Image } from "react-native";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";
import CancelButton from "../post/PostModal/CancelButton";
import Feather from "@expo/vector-icons/Feather";

interface FreeBitesModalProps {
  headText: string;
  headMargin: boolean;
  buttonText1: string;
  buttonIcon1: ReactNode;
  buttonText2: string;
  buttonIcon2: ReactNode;
  onPress1: () => void;
  onPress2: () => void;
  hasCancelButton: boolean;
  modalVisible: boolean;
  setModalVisible: () => void;
}

//For Modals where two button options are given
function FreeBitesModal(props: FreeBitesModalProps) {
  // const [ vis, setVis ] = useState<boolean>(props.modalVisible)

  return (
    <View>
      <Modal
        animationIn={"slideInUp"}
        animationInTiming={400}
        animationOut={"slideOutDown"}
        animationOutTiming={300}
        isVisible={props.modalVisible}
        backdropTransitionOutTiming={0}
        hasBackdrop
        backdropOpacity={0.55}
        coverScreen
        onBackdropPress={props.setModalVisible}
        style={styles.modalContainer}
      >
        <View style={styles.bottomView}>
          <Image
            source={require("../../assets/icons/freebites/FreeBitesLogoSmall.png")}
            style={styles.imgStyle}
          />
          <View style={styles.modalView}>
            {props.headMargin ? (
              <Text style={styles.modalTextMargin}>{props.headText}</Text>
            ) : (
              <Text style={styles.modalText}>{props.headText}</Text>
            )}
            <View style={styles.hr} />
            <Pressable style={styles.button} onPress={props.onPress1}>
              <Text style={styles.textStyle}>{props.buttonText1}</Text>
              {props.buttonIcon1}
            </Pressable>
            <View style={styles.hr} />
            <Pressable style={styles.button} onPress={props.onPress2}>
              <Text style={styles.textStyle}>{props.buttonText2}</Text>
              {props.buttonIcon2}
            </Pressable>
          </View>
        </View>
        {props.hasCancelButton ? (
          <CancelButton onPress={props.setModalVisible}></CancelButton>
        ) : (
          <Text></Text>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  hr: {
    backgroundColor: "#CACFC9",
    width: "100%",
    height: 1.25,
  },
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
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    elevation: 2,
    width: "100%",
    backgroundColor: "#fff",
  },
  buttonOpen: {
    backgroundColor: "#000",
  },
  textStyle: {
    color: "#79767D",
    fontWeight: "500",
    textAlign: "left",
    fontSize: 16,
  },
  modalText: {
    paddingLeft: 25,
    textAlign: "left",
    color: "#58565D",
    fontSize: 14,
    marginBottom: 10,
    width: "95%",
  },
  modalTextMargin: {
    paddingLeft: 25,
    textAlign: "left",
    color: "#58565D",
    fontSize: 14,
    marginBottom: 20,
    marginTop: 10,
  },
});

export default FreeBitesModal;
