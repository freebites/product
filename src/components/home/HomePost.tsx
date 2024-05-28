import { Image, View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { postType } from "../../../types/PostTypes";
import deleteOne from "../../../api/posts/delete";
// import fetchData from "../../app/(tabs)/home/index";
// import DeleteButton from "../common/cards/DeleteButton";
import DeleteModal from "./DeleteModal";

const placeholderImage = require("../../assets/images/kemal.jpg");
interface HomePostProps {
  post: postType;
  onPress: () => void;
  style?: object;
}
export const HomePost = (props: HomePostProps) => {
  const { post, onPress } = props;

  // temp fix for null
  if (!post.imageURIs) {
    post.imageURIs = [];
  }
  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    const loadImageURL = async () => {
      try {
        // grab firebase URL from Firebase
        const url = await getDownloadURL(ref(storage, post.imageURIs[0]));
        setImageURL(url);
      } catch (error) {
        setImageURL(placeholderImage); // set image to dummy pizza when not found
        console.error("Error loading image URL:", error);
      }
    };

    loadImageURL();
  }, [post.imageURIs[0]]);

  return (
    <Pressable style={styles.mainbox} onPress={onPress}>
      <View style={styles.imagebox}>
        <Image
          source={{
            // add loading skeleton here? or a state management if we want the whole post to do an animation
            uri: imageURL != "" ? imageURL : "https://i.gifer.com/ZKZg.gif",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.sidebox}>
        <View style={styles.location}>
          <Text style={styles.text}>{post._id}</Text>
        </View>
        <Text style={styles.description}>{post.title}</Text>
      </View>
      {/* <DeleteButton
        onPress={() => {
          // return <DeleteModal></DeleteModal>;
          // deleteOne(post._id);
          console.log("deleted it");
          // fetchData();
        }}
      ></DeleteButton> */}
      <DeleteModal postID={post._id}></DeleteModal>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainbox: {
    width: "100%",
    backgroundColor: "white",
    height: 151,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,

    flexDirection: "row",
  },
  imagebox: {
    width: 135,
    marginRight: 10,
  },
  image: {
    flex: 1,
    borderRadius: 15,
  },
  sidebox: {
    flex: 3,
    marginLeft: 10,
    flexDirection: "column",
  },
  location: {
    height: 25,
    flexDirection: "row",
  },
  bookmark: {
    width: 20,
    height: 25,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  description: {
    height: 40,
    flexDirection: "row",
  },
  text: {
    fontSize: 10,
  },
});

export default HomePost;
