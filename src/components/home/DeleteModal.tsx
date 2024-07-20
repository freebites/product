import React, { useState } from "react";
import { Alert, StyleSheet, Text, Pressable, View, Image } from "react-native";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";
import FreeBitesModal from "./FreeBitesModal";
import FreeBitesConfirmationModal from "./FreeBitesConfirmationModal";
import deleteOne from "../../../api/posts/delete";

interface DeleteButtonProps {
  postID: string;
  userPost: boolean;
  setRefreshing: (arg0: boolean) => void;
  fetchData: () => void;
}

const DeleteModal = (props: DeleteButtonProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const { postID, userPost, setRefreshing, fetchData } = props;

  const deleteFunc = async () => {
    changeConfirmVisible();
    setModalVisible(!modalVisible);
    await deleteOne(postID);
    fetchData();
    setRefreshing(true);
  };

  const changeModalVisible = () => {
    setModalVisible(!modalVisible);
  };
  const changeConfirmVisible = () => {
    setConfirmVisible(!confirmVisible);
  };

  return (
    <View style={styles.trashIconContainer}>
      {userPost ? (
        <View>
          <FreeBitesConfirmationModal
            headText="You successfully deleted your post!"
            modalVisible={confirmVisible}
            setModalVisible={changeConfirmVisible}
          />

          <FreeBitesModal
            headText="Are you sure you want to delete this post?"
            headMargin={true}
            buttonText1="Yes!"
            buttonIcon1={null}
            buttonText2="No, oops"
            buttonIcon2={null}
            onPress1={() => {
              console.log("Pressed 1");
              deleteFunc();
            }}
            onPress2={() => {
              console.log("Pressed 2");
              setModalVisible(!modalVisible);
            }}
            hasCancelButton={false}
            modalVisible={modalVisible}
            setModalVisible={changeModalVisible}
          />

          <Pressable onPress={() => setModalVisible(true)}>
            <Image
              source={require("../../assets/icons/trash.png")}
              style={styles.trashIcon}
            />
          </Pressable>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  trashIconContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  trashIcon: {
    width: 24,
    height: 24,
  },
});

export default DeleteModal;
