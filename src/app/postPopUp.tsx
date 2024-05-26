import { View, SafeAreaView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import PostCard from "../components/home/PostCard";

export const postPopUp = () => {
  const params = useLocalSearchParams();
  const postId = Array.isArray(params) ? params[0] : params;

  return (
    <SafeAreaView style={[styles.cardView, { backgroundColor: "white" }]}>
      <View style={styles.cardbox}>
        <PostCard id={postId.id} />
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
