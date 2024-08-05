import {
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { postType } from "../../../types/PostTypes";
import { COLORS } from "../../constants";

const clock = require("../../assets/icons/clock.png");
const trash = require("../../assets/icons/trash.png");
const avatar = require("../../assets/icons/janesmith.png");
import DeleteModal from "./DeleteModal";
import { useAuth } from "@context/auth";

const placeholderImage = require("../../assets/images/kemal.jpg");

interface HomePostProps {
  post: postType;
  onPress: () => void;
  setRefreshing: (arg0: boolean) => void;
  fetchData: () => void;
  style?: object;
}

export const HomePost = (props: HomePostProps) => {
  const { post, onPress, setRefreshing, fetchData } = props;
  const { user } = useAuth();

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

      <View style={styles.topbox}>
        <Image source={avatar} style={{ width: 13.916, height: 13.916 }} />
        <Text style={{ fontSize: 8.118, color: COLORS.neutral[100] }}>
          Jane Smith
        </Text>
      </View>

      <View style={{ width: "100%", flex: 1, flexDirection: "row" }}>
        <View style={styles.leftbox}>
          <View style={styles.time}>
            <Image source={clock} style={{ width: 9, height: 9 }} />
            <Text style={{ color: COLORS.brown[30], fontSize: 10 }}>
              5 min ago
            </Text>
          </View>

          <View style={styles.location}>
            {/* <Text>location</Text> */}
            <Text
              style={{
                color: COLORS.brown[70],
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              JCC 160{post.location ? post.location.place_id : post.location}
            </Text>
          </View>

          <Text style={styles.description}>
            Assorted pizzas from TCU event...{post.title}
          </Text>
        </View>

        <View style={styles.rightbox}>
          <View>
            <Pressable
              style={true ? { display: "none" } : { opacity: 0 }}
              disabled={true ? true : false}
            >
              <Image source={trash} style={{ width: 24, height: 24 }} />
            </Pressable>
          </View>
          <View style={{ flexDirection: "row", gap: 6, alignSelf: "flex-end" }}>
            <Image source={clock} style={{ width: 24, height: 24 }} />
            <Image source={clock} style={{ width: 24, height: 24 }} />
            <Image source={clock} style={{ width: 24, height: 24 }} />
          </View>
        </View>
      </View>

      <DeleteModal
        postID={post._id}
        userPost={post.postedBy === user.uid}
        setRefreshing={setRefreshing}
        fetchData={fetchData}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainbox: {
    width: "100%",
    backgroundColor: "white",
    height: 224,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 20,
    flexDirection: "column",
  },
  imagebox: {
    width: "100%",
    height: 125,
    marginRight: 10,
  },
  image: {
    flex: 1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  leftbox: {
    width: "65%",
    flexDirection: "column",
    borderBottomLeftRadius: 15,
    paddingLeft: 25,
    paddingVertical: 18,
    gap: 4,
  },
  rightbox: {
    flexDirection: "column",
    width: "35%",
    borderBottomRightRadius: 15,
    paddingHorizontal: 24,
    paddingVertical: 18,
    alignItems: "flex-end",
    gap: 13,
  },
  topbox: {
    width: 69,
    height: 20.874,
    borderRadius: 6.79,
    marginLeft: 17,
    marginVertical: 17,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4.64,
    gap: 2.9,
    position: "absolute",
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
    flexDirection: "row",
    color: COLORS.brown[50],
    fontSize: 12,
  },
  text: {
    fontSize: 10,
  },
});

export default HomePost;
