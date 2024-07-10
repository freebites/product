import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, View, Image, KeyboardAvoidingView, TextInput } from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../../constants/theme";

interface ReportModal {
  reportVisible: boolean;
  setReportVisible: () => void;
}

export const ReportModal = (props: ReportModal) => {
  const { reportVisible, setReportVisible } = props;
  const [text, changeText] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [introText, setIntroText] = useState<string>(
    "Would you like to report or share this post?"
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
      isVisible={reportVisible}
      backdropTransitionInTiming={1}
      backdropTransitionOutTiming={300}
      hasBackdrop
      backdropOpacity={0.55}
      // coverScreen
      onBackdropPress={() => {
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
                    setReportVisible();
                    setSubmitted(false);
                    changeText("");
                    setIntroText(
                      "Would you like to report or share this post?"
                    );
                    setButtonText("Submit");
                  }
                }}
              >
                <Text>{buttonText}</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.cancelButton}
                onPress={() => setReportVisible()}
              >
                <Text>Cancel</Text>
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

  reportContainer: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "100%",
    height: 153,
    paddingVertical: 10,
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
  },

  textContainer: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "100%",
    height: 153,
    paddingVertical: 10,
  },

  text: {
    textAlign: "center",
    width: "90%",
  },

  cancelButton: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "100%",
    height: 43,
    marginTop: 5,
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
