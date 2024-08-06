import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { postType, comment } from "freebites-types";
import update from "@api/posts/update";
import { useAuth } from "@context/auth";

interface UploadCommentProps {
  singlePost: postType;
  setSinglePost: (post: postType) => void;
  functionality: boolean;
}
export const UploadComment = (props: UploadCommentProps) => {
  const { user } = useAuth();
  const [newCommentText, setNewCommentText] = useState("");
  const [buttonOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(buttonOpacity, {
      toValue: newCommentText.trim().length > 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [newCommentText]); // Re-run the effect whenever newCommentText changes

  const handleCommentChange = (text: string) => {
    setNewCommentText(text);
  };

  const handleUpdateComments = async (newComment: comment) => {
    try {
      const updatedComments = [...props.singlePost.comments, newComment];
      const updatedPost = { ...props.singlePost, comments: updatedComments };
      props.setSinglePost(updatedPost);
      await update({ post: updatedPost, itemID: updatedPost._id });
    } catch (error: any) {
      console.error("Error updating comments:", error);
    }
  };

  const handleAddComment = () => {
    if (newCommentText.trim().length > 0) {
      const newComment = {
        // _id: uuid, // TODO: replace with actual id
        username: user.userName,
        body: newCommentText,
        timestamp: new Date(),
        postedBy: user.uid,
      };

      handleUpdateComments(newComment);

      setNewCommentText("");
    } else {
      console.log("empty comment");
    }
  };

  if (props.functionality) {
    return (
      <KeyboardAvoidingView behavior="position">
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 40,
            paddingTop: 10,
            paddingHorizontal: 20,
            backgroundColor: "white",
            position: "relative",
          }}
        >
          <Image
            source={require("../../assets/icons/freebites/3d_avatar_25.png")}
          />
          <View style={styles.textBox}>
            <TextInput
              style={styles.textInput}
              placeholder="Add a comment for this post..."
              placeholderTextColor="#AEA9B1"
              value={newCommentText}
              onChangeText={handleCommentChange}
            />
            <View style={styles.rectangle}>
              <Image
                source={require("../../assets/icons/freebites/rectangle-comments.png")}
              />
            </View>
            <Animated.View
              style={[styles.postButton, { opacity: buttonOpacity }]}
            >
              <TouchableOpacity
                style={styles.postButton}
                onPress={handleAddComment}
              >
                <Image
                  source={require("../../assets/icons/freebites/arrow-up-circle.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <Image
          source={require("../../assets/icons/freebites/3d_avatar_25.png")}
        />
        <View style={[styles.textBox, styles.textBoxCard]}>
          <View style={{ justifyContent: "center" }}>
            <Text style={[styles.textInput, styles.textInputCard]}>
              Add a comment for this post...
            </Text>
          </View>
          <View style={styles.rectangle}>
            <Image
              source={require("../../assets/icons/freebites/rectangle-comments.png")}
            />
          </View>
          <View style={styles.postButton}>
            <View>
              <Image
                source={require("../../assets/icons/freebites/arrow-up-circle.png")}
                style={{ width: 25, height: 25 }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  textBox: {
    borderStyle: "solid",
    borderWidth: 1,
    marginLeft: 20,
    flexDirection: "row",
    borderRadius: 15,
    borderColor: "#F3F0F4",
    // width: "100%",
  },
  textBoxCard: {
    flex: 1,
    justifyContent: "center",
  },
  divider: {
    width: "100%",
    backgroundColor: "#F3F0F4",
    color: "#F3F0F4",
  },
  textInput: {
    fontSize: 13,
    width: 225,
    // marginRight: 5,
    marginLeft: 10,
    fontWeight: "400",
  },
  textInputCard: {
    paddingLeft: 10,
    width: 225,
    color: "#AEA9B1",
    fontSize: 12,
  },
  postButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginRight: 7,
    // marginBottom: 10,
    justifyContent: "center",
  },
  rectangle: {
    display: "flex",
    paddingLeft: 2,
    marginRight: 3,
    justifyContent: "center",
  },
});
export default UploadComment;
