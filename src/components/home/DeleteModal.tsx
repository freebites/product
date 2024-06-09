import React, { useState } from "react";
import { Alert, StyleSheet, Text, Pressable, View, Image } from "react-native";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";

import deleteOne from "../../../api/posts/delete";

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
    <View style={styles.trashIconContainer}>
      {userPost ? (
        <View>
          <Modal
            animationIn={"slideInUp"}
            animationInTiming={400}
            animationOut={"slideOutDown"}
            animationOutTiming={300}
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(!modalVisible)}
            coverScreen={true}
            hasBackdrop={true}
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
                  style={styles.button}
                  onPress={async () => {
                    setModalVisible(!modalVisible);
                    await deleteOne(postID);
                    fetchData();
                    setRefreshing(true);
                  }}
                >
                  <Text style={styles.textStyle}>Yes!</Text>
                </Pressable>
                <View style={styles.hr} />
                <Pressable
                  style={styles.button}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>No oops</Text>
                </Pressable>
              </View>
              {/* <View style={styles.cancelButton}>
                <Pressable
                  style={styles.button}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                  <Icon type={"feather"} name={"x"}></Icon>
                </Pressable>
              </View> */}
            </View>
          </Modal>
          <Pressable onPress={() => setModalVisible(true)}>
            <Image
              source={require("../../assets/icons/trash.png")}
              style={styles.trashIcon}
            />
          </Pressable>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  trashIconContainer: {
    display: "flex",
    borderRadius: 25,
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
  bottomView: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    margin: 0,
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
  cancelButton: {
    width: "100%",
    marginBottom: 10,
    marginTop: 5,
    backgroundColor: "white",
    borderRadius: 20,
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
    paddingLeft: 30,
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    marginTop: 10,
    textAlign: "center",
    color: "#58565D",
    fontSize: 14,
  },
});

export default DeleteModal;
