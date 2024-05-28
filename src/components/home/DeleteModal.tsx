import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";

import deleteOne from "../../../api/posts/delete";

interface DeleteButtonProps {
  postID: string;
}

const DeleteModal = (props: DeleteButtonProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { postID } = props;

  return (
    <View style={styles.trashIcon}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // coverScreen={true}
        // hasBackdrop={isBackdrop}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.bottomView}>
          {/* <img src={logo} alt="carrot logo" /> */}
          <Image
            src={"../../assets/icons/freebites/FreeBitesLogoSmall.png"}
            style={styles.imgStyle}
          />
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this post?
            </Text>
            <hr style={styles.hr}></hr>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                deleteOne(postID);
              }}
            >
              <Text style={styles.textStyle}>Yes!</Text>
            </Pressable>
            <hr style={styles.hr}></hr>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>No Oops!</Text>
            </Pressable>
          </View>
          <View style={styles.cancelButton}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        // style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        {/* <Text style={styles.textStyle}>Show Modal</Text> */}
        <Icon type={"entypo"} name={"trash"}></Icon>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  trashIcon: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "flex-end",
  },
  hr: {
    backgroundColor: "#CACFC9",
    width: "100%",
    height: 0.25,
  },
  imgStyle: {
    width: 45,
    height: 50,
    marginBottom: 10,
  },
  bottomView: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    // margin: "auto",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    width: "90%",
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cancelButton: {
    width: "90%",
    marginBottom: 30,
    marginTop: 15,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    // margin: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#000",
  },
  buttonClose: {
    backgroundColor: "#fff",
  },
  textStyle: {
    color: "gray",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default DeleteModal;
