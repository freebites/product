import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import BackButton from "@components/common/BackButton";
import PostCard from "@components/home/PostCard";
import { globalStyles } from "@components/global";

export const postPopUp = () => {
  let params = useLocalSearchParams();

  // cast as string
  const postid = params.id as string;

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.cardbox}>
        <PostCard id={postid} />
      </View>
      <BackButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardbox: {
    height: 650,
    marginTop: 50,
    width: 345,
  },
});

export default postPopUp;
