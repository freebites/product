import {
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { postType } from "freebites-types";
import { COLORS } from "../../constants";
const placeholder = require(" ../../../assets/icons/freebites/placeholder.png");

const clock = require("../../assets/icons/clock.png");
const trash = require("../../assets/icons/trash.png");
import DeleteModal from "./DeleteModal";
import { useAuth } from "@context/auth";
import MissingImageSvg from "./svg/missingImageSVG";
import { getOneUser } from "../../../api/user/usercrud";
import { EmptyUser, UserType } from "../../context/userContext";
import { getTimeDifference } from "../../utils";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingPP, setLoadingPP] = useState<boolean>(true);
  const [address, setAddress] = useState<string>();
  const [postedByData, setPostedByData] = useState<UserType>(EmptyUser);
  const [postedByPic, setPostedByPic] = useState<string>("");

  // temp fix for null
  if (!post.imageURIs) {
    post.imageURIs = [];
  }
  const [imageURL, setImageURL] = useState<string>("");

  const timeAgo = getTimeDifference({ postTime: post.postTime });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const apiKey = process.env.EXPO_PUBLIC_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${post.location.place_id}&key=${apiKey}`;
        const response = await fetch(url, { method: "GET", mode: "cors" });
        const data = await response.json();
        setAddress(
          data.result ? data.result.formatted_address : "Location not available"
        );
      } catch (error) {
        console.error("Error fetching place details:", error);
        return null;
      }
    };
    if (post.location.place_id) fetchAddress();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getOneUser(post.postedBy);
        setPostedByData(data);
        if (data.profile) {
          const url = await getDownloadURL(
            ref(storage, "profilePictures/" + data.profile)
          );
          setPostedByPic(url);
        } else {
          setPostedByPic(placeholder);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoadingPP(false);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const loadImageURL = async () => {
      try {
        // grab firebase URL from Firebase
        const url = await getDownloadURL(ref(storage, post.imageURIs[0]));
        setImageURL(url);
      } catch (error) {
        console.error("Error loading image URL:", error);
      }
      setIsLoading(false);
    };

    loadImageURL();
  }, [post.imageURIs[0]]);

  return (
    <View>
      <Pressable style={styles.mainbox} onPress={onPress}>
        <View style={styles.imagebox}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#F19D48" />
          ) : imageURL ? (
            <Image
              source={{
                uri: imageURL,
              }}
              style={styles.image}
            />
          ) : (
            <MissingImageSvg />
          )}
        </View>
        {postedByData.userName && (
          <View style={styles.topbox}>
            {loadingPP ? (
              <ActivityIndicator color="#F19D48" />
            ) : (
              <Image
                source={postedByPic ? { uri: postedByPic } : placeholder}
                style={{ width: 13.916, height: 13.916 }}
              />
            )}
            <Text style={{ fontSize: 8.118, color: COLORS.neutral[100] }}>
              {postedByData?.userName}
            </Text>
          </View>
        )}

        <View style={{ width: "100%", flex: 1, flexDirection: "row" }}>
          <View style={styles.leftbox}>
            <View style={styles.time}>
              <Image source={clock} style={{ width: 9, height: 9 }} />
              <Text style={{ color: COLORS.brown[30], fontSize: 10 }}>
                {timeAgo}
              </Text>
            </View>

            <View style={styles.location}>
              <Text
                style={{
                  color: COLORS.brown[70],
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {address ?? "Location not available"}
              </Text>
            </View>

            <Text style={styles.description}>{post.description}</Text>
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
            <View
              style={{ flexDirection: "row", gap: 6, alignSelf: "flex-end" }}
            >
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
    </View>
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
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
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
