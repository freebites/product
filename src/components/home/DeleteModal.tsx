import React, { useState } from "react";
import { Alert, StyleSheet, Text, Pressable, View, Image } from "react-native";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";

import deleteOne from "../../../api/posts/delete";
import fetchData from "../../app/(tabs)/home/index";
import { router } from "expo-router";

interface DeleteButtonProps {
  postID: string;
  userPost: boolean;
  setRefreshing: (arg0: boolean) => void;
  fetchData: () => void;
}

const DeleteModal = (props: DeleteButtonProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { postID, userPost, setRefreshing, fetchData } = props;

  return (
    <View style={styles.trashIcon}>
      {userPost ? (
        <View>
          <Modal
            animationIn={"slideInUp"}
            animationInTiming={400}
            animationOut={"slideOutDown"}
            animationOutTiming={300}
            // transparent={true}
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(!modalVisible)}
            coverScreen={true}
            // hasBackdrop={true}
            // onRequestClose={() => {
            //   Alert.alert("Modal has been closed.");
            //   setModalVisible(!modalVisible);
            // }}
          >
            <View style={styles.bottomView}>
              <Image
                source={require("../../assets/icons/freebites/FreeBitesLogoSmall.png")}
                style={styles.imgStyle}
              />
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Are you sure you want to delete this post?
                </Text>
                <View style={styles.hr} />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={async () => {
                    setModalVisible(!modalVisible);
                    await deleteOne(postID);
                    fetchData();
                    setRefreshing(true);
                    // router.push("/home");
                  }}
                >
                  <Text style={styles.textStyle}>Yes!</Text>
                </Pressable>
                <View style={styles.hr} />
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
          <Pressable onPress={() => setModalVisible(true)}>
            <Icon type={"entypo"} name={"trash"}></Icon>
          </Pressable>
        </View>
      ) : (
        <View> </View>
      )}
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
    height: 1.25,
    margin: 1,
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
    // backgroundColor: "rgba(0,0,0,0.4)",
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
