import { Image, View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import PostDate from "./PostDate";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { postType } from "freebites-types";
import { router } from "expo-router";
const placeholderImage = require("../../assets/images/kemal.jpg");

interface DisplayCommentsProps {
  singlePost: postType;
  setModalVisible: (value: boolean) => void;
}

export const DisplayComments = (props: DisplayCommentsProps) => {
  return (
    <ScrollView style={{ zIndex: 30 }}>
      <TouchableOpacity>
        {props.singlePost.comments.length > 0 ? (
          props.singlePost.comments.map((comment) => (
            <TouchableOpacity
              key={comment.username + comment.body}
              onPress={() => {
                props.setModalVisible(false);
                router.push({
                  pathname: "home/profilePopUp",
                  params: { id: comment.postedBy },
                });
              }}
            >
              <View
                style={styles.comments}
                key={comment.username + comment.body}
              >
                <Image
                  source={require("../../assets/icons/freebites/3d_avatar_25.png")}
                />
                <View style={styles.commentContent}>
                  <View>
                    <Text style={styles.username}>{comment.username}</Text>
                    <Text style={styles.body}>{comment.body}</Text>
                  </View>
                  <View style={styles.postTimeWrapper}>
                    <PostDate postDateTime={comment.timestamp} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.modalNoComments}>
            <Text
              style={{
                fontSize: 22,
                color: "#485445",
                fontWeight: "bold",
                marginTop: 100,
              }}
            >
              No comments yet
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#93A38F",
                marginTop: 20,
                textAlign: "center",
              }}
            >
              Commenting helps other users know {"\n"}
              more about the status of the food!
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  comment: {
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
    fontWeight: "400",
    paddingBottom: 5,
  },
  comments: {
    flexDirection: "row",
    paddingBottom: 10,
    paddingTop: 10,
    flex: 1,
    paddingLeft: 0,
  },
  modalNoComments: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  noComments: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "400",
  },
  reply: {
    fontSize: 9,
    color: "rgba(174, 169, 177, 1)",
    fontWeight: "bold",
  },
  commentContent: {
    paddingLeft: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
  },
  postTimeWrapper: {
    alignItems: "flex-end",
  },
});
export default DisplayComments;
