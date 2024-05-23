import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import Modal from "react-native-modal";
import React, { useMemo, useEffect, useRef } from "react";

import DisplayComments from "./DisplayComments";

import UploadComment from "./UploadComment";
const dragHandle = require("../../assets/images/Drag_handle.png");

export const CommentsModal = (props) => {
  const isKeyboardVisible = useRef(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        isKeyboardVisible.current = true;
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        isKeyboardVisible.current = false;
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const dismissKeyboard = () => {
    if (isKeyboardVisible.current) {
      Keyboard.dismiss();
    }
  };

  const isBackdrop = useMemo(() => {
    return props.commentsVisible;
  }, [props.commentsVisible]);

  const handleModalSwipe = () => {
    props.changeCommentsVisible();
  };

  const handleModalSwipeMove = (percent) => {
    if (percent > 0 && isKeyboardVisible.current) {
      dismissKeyboard();
    }
  };

  return (
    <Modal
      animationIn={"slideInUp"}
      animationInTiming={400}
      animationOut={"slideOutDown"}
      animationOutTiming={300}
      backdropTransitionOutTiming={200}
      swipeThreshold={100}
      onSwipeMove={handleModalSwipeMove}
      onSwipeComplete={handleModalSwipe}
      swipeDirection={["down"]}
      isVisible={props.commentsVisible}
      propagateSwipe
      coverScreen={true}
      hasBackdrop={isBackdrop}
      onBackdropPress={() => props.changeCommentsVisible()}
      style={styles.modalContent}
    >
      <KeyboardAvoidingView
        behavior="position"
        style={{ width: "100%" }}
        keyboardVerticalOffset={-20}
      >
        <View style={styles.modalComments}>
          <View style={styles.titleContainer}>
            <Image source={dragHandle}></Image>
            <Text style={styles.titleText}>Live Thread</Text>
          </View>
          <ScrollView style={styles.commentThread}>
            <DisplayComments
              modalVisible={props.modalVisible}
              singlePost={props.singlePost}
            />
          </ScrollView>
          <UploadComment
            singlePost={props.singlePost}
            setSinglePost={props.setSinglePost}
            functionality={true}
          ></UploadComment>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 0,
  },
  divider: {
    width: "100%",
    backgroundColor: "#F3F0F4",
    color: "#F3F0F4",
  },
  modalComments: {
    backgroundColor: "white",
    borderColor: "#F3F0F4",
    borderStyle: "solid",
    borderWidth: 2,
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  titleText: {
    paddingTop: 10,
    fontWeight: "500",
    fontSize: 18,
    color: "black",
  },
  commentThread: {
    height: 340,
    width: "100%",
    paddingHorizontal: 35,
    borderTopColor: "#F3F0F4",
    borderTopWidth: 1,
    borderBottomColor: "#F3F0F4",
    borderBottomWidth: 1,
  },
});
export default CommentsModal;
