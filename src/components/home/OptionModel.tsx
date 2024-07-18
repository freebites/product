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
import * as Sharing from "expo-sharing";
import { ReportModal } from "../home/ReportModal.tsx";

const OptionModel = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);

  const closeReportModal = () => {
    setModalVisible(false);
    setReportModalVisible(false);
  };

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
    <View>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Icon type={"entypo"} name={"dots-three-horizontal"} />
      </Pressable>

      <Modal
        animationIn={undefined}
        animationInTiming={400}
        animationOut={"slideOutDown"}
        animationOutTiming={0}
        isVisible={modalVisible}
        backdropTransitionInTiming={0}
        backdropTransitionOutTiming={0}
        hasBackdrop
        backdropOpacity={0.55}
        coverScreen
        onBackdropPress={() => {
          setModalVisible(false);
          setReportModalVisible(false);

          setSubmitted(false);
          changeText("");
          setIntroText("Would you like to report or share this post?");
          setButtonText("Submit");
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

          {reportModalVisible ? (
            //Report Modal

            <View>
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
                      setModalVisible(false);
                      setReportModalVisible(false);
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
                  onPress={() => {
                    setModalVisible(false);
                    setReportModalVisible(false);
                  }}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                  <Icon type={"antDesign"} name={"close"} />
                </Pressable>
              )}
            </View>
          ) : (
            //Option Modal

            <View>
              <View style={styles.textContainer}>
                <View style={styles.headText}>
                  <Text style={styles.modalText}>
                    Would you like to report or share this post?
                  </Text>
                </View>

                <Pressable
                  style={styles.optionButton}
                  onPress={() => {
                    // setModalVisible(false);
                    setReportModalVisible(true);
                  }}
                >
                  <Text style={styles.textStyle}>Report</Text>
                </Pressable>

                <Pressable
                  style={styles.optionButton}
                  onPress={() =>
                    Sharing.shareAsync(
                      "https://www.youtube.com/watch?v=N3uGzshhntM"
                    )
                  }
                >
                  <Text style={styles.textStyle}>Share</Text>
                </Pressable>
              </View>

              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
                <Icon type={"antDesign"} name={"close"} />
              </Pressable>
            </View>
          )}
        </KeyboardAvoidingView>
      </Modal>

      {/* {!reportModalVisible ? (
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
              <View style={styles.headText}>
                <Text style={styles.modalText}>
                  Would you like to report or share this post?
                </Text>
              </View>

              <Pressable
                style={styles.optionButton}
                onPress={() => {
                  setModalVisible(false);
                  setReportModalVisible(true);
                }}
              >
                <Text style={styles.textStyle}>Report</Text>
              </Pressable>

              <Pressable
                style={styles.optionButton}
                onPress={() =>
                  Sharing.shareAsync(
                    "https://www.youtube.com/watch?v=N3uGzshhntM"
                  )
                }
              >
                <Text style={styles.textStyle}>Share</Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
              <Icon type={"antDesign"} name={"close"} />
            </Pressable>
          </Modal>
        </View>
      ) : (
        <View>
          <ReportModal
            reportVisible={reportModalVisible}
            setReportVisible={closeReportModal}
          ></ReportModal>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },

  headText: {
    paddingVertical: 20,
  },

  imgStyle: {
    width: 46,
    height: 52,
    marginBottom: 10,
    alignSelf: "center",
  },

  textContainer: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "100%",
    height: 163,
    paddingTop: 10,
    paddingBottom: 15,
  },

  optionButton: {
    borderTopColor: COLORS.gray,
    borderTopWidth: 1,
    width: "100%",
    padding: 15,
  },

  modalText: {
    color: COLORS.neutral[90],
    fontSize: 14,
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

  text: {
    textAlign: "center",
    width: "90%",
  },
});

export default OptionModel;
