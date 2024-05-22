import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import {
  Link,
  router,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import React, { useContext } from "react";
import BackButton from "../../../components/common/BackButton";
import { PostContext, postType } from "../../../context/postContext";
import PostCard from "../../../components/home/PostCard";
import { globalStyles } from "../../../components/global";
import post from "../../../components/common/cards/post";
import { useLocation } from "react-router-dom";

export const postPopUp = (props, state) => {
  // const { postData, updatePostData } = useContext(PostContext);
  // console.log("here" + postData)
  // const postLocation = useLocation();
  // const postData = postLocation.state?.post;
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();

  console.log(JSON.stringify(params));

  return (
    <SafeAreaView style={styles.cardView}>
      <View style={styles.cardbox}>
        <PostCard id={params.id} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardbox: {
    height: "100%",
    width: "100%",
  },
  cardView: {
    height: "100%",
    flex: 1,
    overflow: "hidden",
  },
});

export default postPopUp;
