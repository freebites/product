import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";
import { COLORS } from "../../constants/theme";
import * as Sharing from "expo-sharing";
import { ReportModal } from "../home/ReportModal.tsx";

const OptionModel = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);

  //Report Model
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

  const changeReportVisible = () => {
    setReportModalVisible(!reportModalVisible);
  };

  const openreportModal = () => {
    setModalVisible(false);
    setReportModalVisible(true);
  };
  const closeReportModal = () => {
    setModalVisible(false);
    setReportModalVisible(false);
  };

  // console.log("1: report visible in options file: " + reportModalVisible);
  return (
    <View>
      <Pressable
        onPress={() => {
          console.log("pressed the three dots");
          setModalVisible(true);
        }}
      >
        <Icon type={"entypo"} name={"dots-three-horizontal"} />
      </Pressable>
      {!reportModalVisible ? (
        <View>
          <Modal
            animationIn={undefined}
            animationInTiming={400}
            animationOut={"slideOutDown"}
            animationOutTiming={!reportModalVisible ? 0 : 1}
            isVisible={modalVisible}
            backdropTransitionInTiming={0}
            backdropTransitionOutTiming={!reportModalVisible ? 0 : 1}
            hasBackdrop
            backdropOpacity={0.55}
            coverScreen
            onBackdropPress={() => {
              setModalVisible(false);
            }}
            style={styles.modalContainer}
          >
            <Image
              source={require("../../assets/icons/freebites/FreeBitesLogoSmall.png")}
              style={styles.imgStyle}
            />
            <View style={styles.textContainer}>
              <View>
                <Text>Would you like to report or share this post?</Text>
              </View>

              <Pressable
                style={styles.optionButton}
                onPress={() => {
                  setModalVisible(false);
                  setReportModalVisible(true);
                }}
              >
                <Text>Report</Text>
              </Pressable>

              <Pressable
                style={styles.optionButton}
                onPress={() =>
                  Sharing.shareAsync(
                    "https://www.youtube.com/watch?v=N3uGzshhntM"
                  )
                }
              >
                <Text>Share</Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text>Cancel</Text>
            </Pressable>
          </Modal>
        </View>
      ) : (
        <View>
          <ReportModal
            reportVisible={reportModalVisible}
            // setReportVisible={changeReportVisible}
            setReportVisible={closeReportModal}
          ></ReportModal>
        </View>
      )}

      {/* <View>
        <Modal
          animationIn={"slideInUp"}
          animationInTiming={400}
          animationOut={"slideOutDown"}
          animationOutTiming={300}
          isVisible={modalVisible}
          backdropTransitionOutTiming={0}
          hasBackdrop
          backdropOpacity={0.55}
          coverScreen
          onBackdropPress={() => {
            setModalVisible(!modalVisible);
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
                    setModalVisible(false);
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
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </Pressable>
            )}
          </KeyboardAvoidingView>
        </Modal>
      </View> */}
    </View>
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

  optionButton: {
    borderTopColor: COLORS.gray,
    borderTopWidth: 1,
    width: "100%",
    padding: 20,
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

export default OptionModel;
