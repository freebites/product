import React, { useState } from "react";
import { StyleSheet, Pressable, View, Image } from "react-native";
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
  const [deleting, setDeleting] = useState<boolean>(false);

  const deleteFunc = async () => {
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
            pressEffect={true}
            onPress={deleteFunc}
          />

          <FreeBitesModal
            headText="Are you sure you want to delete this post?"
            headMargin={true}
            buttonText1="Yes!"
            buttonIcon1={null}
            buttonText2="No, oops"
            buttonIcon2={null}
            onPress1={() => {
              setDeleting(true);
              changeModalVisible();
            }}
            onPress2={() => {
              setModalVisible(false);
            }}
            hasCancelButton={false}
            modalVisible={modalVisible}
            setModalVisible={changeModalVisible}
            onModalHide={() => {
              if (deleting) {
                changeConfirmVisible();
              }
            }}
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
