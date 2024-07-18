import React, { useState } from "react";
import { Alert, StyleSheet, Text, Pressable, View, Image } from "react-native";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";
import CancelButton from "../post/PostModal/CancelButton";

interface FreeBitesModalProps {
  headText: string;
  buttonText1: string;
  buttonText2: string;
  onPress1: () => void;
  onPress2: () => void;
  hasCancelButton: boolean;
  modalVisible: boolean;
  setModalVisible: () => void;
}

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
        onBackdropPress={
          props.setModalVisible}
        style={styles.modalContainer}
      >
        <View style={styles.bottomView}>
          <Image
            source={require("../../assets/icons/freebites/FreeBitesLogoSmall.png")}
            style={styles.imgStyle}
          />
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.headText}</Text>
            <View style={styles.hr} />
            <Pressable
              style={styles.button}
              onPress={props.onPress1}
            >
              <Text style={styles.textStyle}>{props.buttonText1}</Text>
            </Pressable>
            <View style={styles.hr} />
            <Pressable
              style={styles.button}
              onPress={props.onPress2}
            >
              <Text style={styles.textStyle}>{props.buttonText2}</Text>
            </Pressable>
          </View>
        </View>
        {props.hasCancelButton ? <CancelButton onPress={
          props.setModalVisible}></CancelButton> : <Text></Text>}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  trashIconContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  trashIcon: {
    width: 24,
    height: 24,
  },
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
    padding: 10,
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
    paddingLeft: 15,
    fontSize: 16,
  },
  modalText: {
    marginBottom: 20,
    marginTop: 10,
    paddingLeft: 25,
    textAlign: "left",
    color: "#58565D",
    fontSize: 14,
  },
});

export default FreeBitesModal;
