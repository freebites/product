import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase";
import Header from "../common/Header";
import { getOneUser } from "@api/user/usercrud";
import { EmptyUser, UserType, postType } from "freebites-types";
import { getWithFilter } from "@api/posts/read";
import HomePost from "./HomePost";
import GrowToggle from "./GrowToggle";
import { router } from "expo-router";
import { globalStyles } from "../../components/global";

const placeholder = require("../../assets/icons/placeholder.png");

interface UserProfileCardProps {
  id: string;
}

const UserProfileCard = (props: UserProfileCardProps) => {
  const { id } = props;
  const [userData, setUserData] = useState<UserType>(EmptyUser);
  const [live, setLive] = useState<boolean>(true);
  const [profilePicURL, setProfilePicURL] = useState("");

  const [AllPosts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const currentTime = new Date().getTime();
  const oneHourInMillis = 60 * 60 * 1000;

  const livePosts = AllPosts.filter((eachPost: postType) => {
    const postTime = new Date(eachPost.postTime).getTime();
    return currentTime - postTime < oneHourInMillis;
  });

  const pastPosts = AllPosts.filter((eachPost: postType) => {
    const postTime = new Date(eachPost.postTime).getTime();
    return currentTime - postTime >= oneHourInMillis;
  });

  const fetchData = async () => {
    let postData = await getWithFilter({
      diet: [""],
      latitude: "",
      longitude: "",
      userID: id,
      perishable: "",
      sort: "",
    });
    setPosts(postData);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
    setRefreshing(true);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getOneUser(id);
        setUserData(data);
        if (data.profile) {
          const url = await getDownloadURL(
            ref(storage, "profilePictures/" + data.profile)
          );
          setProfilePicURL(url);
        } else setProfilePicURL(placeholder);
      } catch (error) {
        setProfilePicURL(placeholder);
      }
    };

    fetchUserData();
  }, [props.id]);

  return (
    <View style={globalStyles.container}>
      <Header text="Profile" />
      <Image
        source={profilePicURL ? { uri: profilePicURL } : placeholder}
        style={styles.picture}
      />
      {userData?.firstName && (
        <Text style={styles.firstLastName}>
          {userData.firstName} {userData.lastName}
        </Text>
      )}
      {userData?.firstName || userData?.pronouns ? ( //Change to username when username field is added in
        <Text style={styles.usernamePronouns}>
          {userData?.firstName}
          {userData?.firstName && userData?.pronouns ? " | " : ""}
          {userData?.pronouns}
        </Text>
      ) : null}
      <View style={styles.mainbox}>
        <View style={styles.toggleContainer}>
          <GrowToggle
            selected={live}
            text={"Live Posts"}
            onPress={() => setLive(true)}
          />
          <GrowToggle
            selected={!live}
            text={"Past Posts"}
            onPress={() => setLive(false)}
          />
        </View>

        {(live ? livePosts : pastPosts).length === 0 ? (
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>No history yet</Text>
            <Text style={styles.textBody}>
              Try making a post by clicking on the + button on the homepage!
            </Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.postContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
            }
          >
            {(live ? livePosts : pastPosts).map((eachPost: postType) => (
              <HomePost
                style={styles.postCard}
                key={eachPost._id}
                post={eachPost}
                setRefreshing={setRefreshing}
                fetchData={fetchData}
                onPress={() =>
                  router.push({
                    pathname: "/postPopUp",
                    params: { id: eachPost._id },
                  })
                }
              />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainbox: {
    zIndex: 20,
    width: "100%",
    height: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  picture: {
    height: 161,
    width: 143,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "60%",
    marginTop: "2%",
    marginBottom: "3%",
  },
  postContainer: {
    rowGap: 15,
    width: "100%",
    paddingHorizontal: 16,
  },
  postCard: {
    marginBottom: 30,
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#505A4E",
    textShadowRadius: 1,
    textShadowColor: "black",
    paddingBottom: 12,
  },
  firstLastName: {
    fontSize: 24,
    color: "#505A4E",
    textShadowRadius: 1,
    opacity: 0.9,
    textShadowColor: "black",
    paddingBottom: 6,
  },
  usernamePronouns: {
    fontSize: 16,
    color: "#505A4E",
    opacity: 0.6,
    textShadowRadius: 1,
    textShadowColor: "black",
    paddingBottom: 12,
  },
  textContainer: {
    margin: "5%",
    width: "65%",
    alignItems: "center",
    flex: 1,
  },
  textBody: {
    textAlign: "center",
    color: "#505A4E",
    opacity: 0.57,
  },
});

export default UserProfileCard;
