import { useFocusEffect, useRouter } from "expo-router";
import React, { useContext } from "react";
import ImageViewer from "@components/common/ImageViewer";
import { PostContext } from "@context/postContext";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import Description from "@components/post/Description";
import { postStyles } from "./styles/postStyles";
import ProgressBar from "@components/post/ProgressBar";
import FreebitesButton from "@components/common/FreebitesButton";

const placeholder = require("../../../assets/images/kemal.jpg");
// TODO: add images to context, drafting
const gallery = () => {
  const { progress, updateProgress, postData, updatePostData } =
    useContext(PostContext);
  // update progress on focus instead of just when it rerenders to force refresh
  useFocusEffect(() => {
    updateProgress(0);
  });
  // handler for storing image URIs
  const handleUpdateImages = (imageLinks: string[]) => {
    updatePostData({
      ...postData,
      imageURIs: imageLinks,
    });
  };
  const router = useRouter();

  // handler for clearing images - async function
  // talk with designers about flow for adding images - when is the user
  // able to delete images/how would they?
  const clearImages = async () => {
    await updatePostData({
      ...postData,
      imageURIs: [],
    });
  };

  // Update multiple values
  const handleUpdateTitle = (title: string) => {
    updatePostData({ title: title });
  };

  // Update multiple values
  const handleUpdateDesc = (descr: string) => {
    updatePostData({ description: descr });
  };

  return (
    <SafeAreaView style={postStyles.container}>
      {/* keyboard and scrollview are for making the keyboard work 
			    as it was blocking the stuff*/}
      <KeyboardAvoidingView
        style={{ width: "100%", flex: 1 }}
        keyboardVerticalOffset={100}
        behavior={"position"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={postStyles.scrollContainer}
          alwaysBounceVertical={false}
        >
          <ProgressBar />

          {/* carousel */}

          <ImageViewer
            placeholderImageSource={placeholder}
            selectedImage={postData.imageURIs}
          />

          {/* inputs, modularize these? */}

          <Text style={styles.title}>What's in the post?</Text>
          <Text style={styles.caption}>
            Give your post a concise description.
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "80%",
            }}
          >
            <Description
              onTextChange={(text: string) => handleUpdateDesc(text)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <FreebitesButton
        text="Next Step"
        allowed={postData.description !== ""}
        onPress={() => {
          router.push("/post/tags");
        }}
      />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    width: 287,
    height: 30,
    textAlign: "left",
    marginTop: 26,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    color: "#535D50",
    width: 287,
    height: 21,
    textAlign: "left",
  },
});

export default gallery;
