import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import React, { useContext } from "react";
import { PostContext } from "@context/postContext";
import TagMultiSelect from "@components/post/TagMultiSelect";
import BinarySelect from "@components/common/BinarySelect";
import ImageViewer from "@components/common/ImageViewer";
import { postStyles } from "./styles/postStyles";
import HorizontalRule from "@components/common/HorizontalRule";
import ProgressBar from "@components/post/ProgressBar";
import RectangleOrangeButton from "@components/common/RectangleOrangeButton";

const placeholder = require("../../../assets/images/kemal.jpg");
// declare object that's only the tags here
const tags = () => {
  const { progress, updateProgress, postData, updatePostData, tagOptions } =
    useContext(PostContext);
  useFocusEffect(() => {
    updateProgress(1);
  });
  // update handlers for each field
  const handleUpdateAllergens = (newAllergens: string[]) => {
    updatePostData({
      tags: { ...postData.tags, allergens: newAllergens },
    });
  };

  const handleUpdateDiets = (newDiets: string[]) => {
    updatePostData({
      tags: { ...postData.tags, diet: newDiets },
    });
  };

  const handleUpdatePerishable = (perishability: string) => {
    updatePostData({
      tags: { ...postData.tags, perishable: perishability },
    });
  };

  return (
    <SafeAreaView style={postStyles.container}>
      <KeyboardAvoidingView
        style={{ width: "100%", flex: 1, alignItems: "center" }}
        keyboardVerticalOffset={100}
        behavior={"position"}
      >
        <ScrollView
          contentContainerStyle={postStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <ProgressBar />
          <View>
            <ImageViewer
              placeholderImageSource={placeholder}
              selectedImage={postData.imageURIs}
            />
          </View>

          <View style={[postStyles.sectionContainer, { marginHorizontal: 0 }]}>
            <Text style={postStyles.pageHeader}>
              Food type? Diets? Allergies?
            </Text>
            <Text style={postStyles.pageH2}>
              Help your peers better navigate their options by selecting the
              following filters!
            </Text>
            <Text style={postStyles.pageH3}>
              Eg. Select vegan if there are vegan options available.
            </Text>
          </View>

          <HorizontalRule color="rgba(147, 163, 143, 0.40)" />

          <View style={postStyles.sectionContainer}>
            <Text style={postStyles.sectionHeader}>
              Perishable <Text style={{ color: "red" }}>*</Text>
            </Text>
            <BinarySelect onPress={handleUpdatePerishable} />
          </View>

          <HorizontalRule color="rgba(147, 163, 143, 0.40)" />

          <View style={postStyles.sectionContainer}>
            <Text style={postStyles.sectionHeader}>Allergies </Text>
            <TagMultiSelect
              changeHandler={handleUpdateAllergens}
              tagOptions={tagOptions.allergies}
              type="allergy"
            />
          </View>

          <View style={[postStyles.sectionContainer, { marginBottom: "30%" }]}>
            <Text style={postStyles.sectionHeader}>Dietary Restrictions </Text>
            <TagMultiSelect
              changeHandler={handleUpdateDiets}
              tagOptions={tagOptions.diet}
              type="diet"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <RectangleOrangeButton
        text="Next Step"
        onPress={() => {
          router.push("/post/location");
        }}
      />
    </SafeAreaView>
  );
};

export default tags;
