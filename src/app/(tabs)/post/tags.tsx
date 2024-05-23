import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Link, useFocusEffect } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import BackButton from "../../../../components/common/BackButton";
import { PostContext } from "../../../context/postContext";
import TagButton from "../../../../components/post/TagButton";
import TagMultiSelect from "../../../../components/post/TagMultiSelect";
import PlainButton2 from "../../../../components/common/PlainButton2";
import BinarySelect from "../../../../components/common/BinarySelect";
import ImageViewer from "../../../../components/common/ImageViewer";
import { postStyles } from "./styles/postStyles";
import { COLORS } from "../../../constants";
import HorizontalRule from "../../../../components/common/HorizontalRule";
import NextButtonText from "../../../../components/post/NextButtonText";
import ProgressBar from "../../../../components/post/ProgressBar";
import FilterPopUp from "../../../../components/post/FilterPopUp";

const placeholder = require("../../../assets/images/kemal.jpg");
// declare object that's only the tags here
const tags = () => {
  const { progress, updateProgress, postData, updatePostData, tagOptions } =
    useContext(PostContext);

  // for animating progress bar
  useFocusEffect(() => {
    updateProgress(1);
  });

  // update handlers for each field
  const handleUpdateAllergens = (newAllergens) => {
    updatePostData({
      tags: { ...postData.tags, allergens: newAllergens },
    });
  };

  const handleUpdateDiets = (newDiets) => {
    updatePostData({
      tags: { ...postData.tags, diet: newDiets },
    });
  };

  const handleUpdatePerishable = (perishability) => {
    updatePostData({
      tags: { ...postData.tags, perishable: perishability },
    });
  };

  return (
    <SafeAreaView style={postStyles.container}>
      <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
        <ScrollView contentContainerStyle={postStyles.scrollContainer}>
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
      </View>
      <Link href="/post/location" asChild>
        <NextButtonText validInput={true} />
      </Link>
    </SafeAreaView>
  );
};

export default tags;
