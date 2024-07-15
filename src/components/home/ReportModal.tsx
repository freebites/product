import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";
import { COLORS } from "../../constants/theme";

interface ReportModal {
  reportVisible: boolean;
  setReportVisible: () => void;
}

export const ReportModal = (props: ReportModal) => {
  const { reportVisible, setReportVisible } = props;
  const [visible, setVisible] = useState<boolean>(reportVisible);

  const [text, changeText] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [introText, setIntroText] = useState<string>(
    "Why are you reporting this post?"
  );
  const [buttonText, setButtonText] = useState<string>("Submit");

  const submitReport = () => {
    setIntroText(
      "Thank you for keeping this community safe! Our team will address this problem as soon as possible :)"
    );
    setButtonText("I got it!");
  };

  return (
    <Modal
      animationIn={"slideInUp"}
      animationInTiming={1}
      animationOut={"slideOutDown"}
      animationOutTiming={300}
      isVisible={visible}
      backdropTransitionInTiming={1}
      backdropTransitionOutTiming={300}
      hasBackdrop
      backdropOpacity={0.55}
      coverScreen
      onBackdropPress={() => {
        setVisible(false);
      }}
      onModalHide={() => {
        setReportVisible();
      }}
      style={styles.modalContainer}
    >
      <KeyboardAvoidingView
        behavior="position"
        style={{ width: "100%" }}
        keyboardVerticalOffset={25}
      >
        <Image
          source={require("../../assets/icons/freebites/FreeBitesLogoSmall.png")}
          style={styles.imgStyle}
        />

        <View style={styles.textContainer}>
          <Text style={styles.text}>{introText}</Text>
          {submitted ? (
            <View></View>
          ) : (
            <TextInput
              style={styles.textInput}
              onChangeText={(newText) => {
                changeText(newText);
              }}
              value={text}
              placeholder="Please type your answer here"
              placeholderTextColor="#AEA9B1"
              multiline={true}
            />
          )}
        </View>
        {text !== "" ? (
          <Pressable
            style={styles.submitButton}
            onPress={() => {
              if (!submitted) {
                submitReport();
                setSubmitted(true);
              } else {
                setVisible(false);
                setSubmitted(false);
                changeText("");
                setIntroText("Would you like to report or share this post?");
                setButtonText("Submit");
              }
            }}
          >
            <Text>{buttonText}</Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.cancelButton}
            onPress={() => {
              setVisible(false);
            }}
          >
            <Text style={styles.textStyle}>Cancel</Text>
            <Icon type={"antDesign"} name={"close"} />
          </Pressable>
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },

  imgStyle: {
    width: 46,
    height: 52,
    marginBottom: 10,
    alignSelf: "center",
  },

  textInput: {
    width: "90%",
    height: 86,
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginVertical: 10,
    borderRadius: 20,
    padding: 20,
    textAlign: "left",
  },

  textContainer: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "100%",
    height: 163,
    paddingVertical: 10,
  },

  text: {
    textAlign: "center",
    width: "90%",
  },

  textStyle: {
    color: COLORS.neutral[70],
    fontWeight: "500",
    textAlign: "left",
    paddingLeft: 15,
    fontSize: 16,
  },

  cancelButton: {
    backgroundColor: COLORS.white,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    width: "100%",
    height: 43,
    marginTop: 5,
    paddingHorizontal: 20,
  },

  submitButton: {
    backgroundColor: COLORS.orange[80],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "100%",
    height: 43,
    marginTop: 5,
  },
});

export default ReportModal;
