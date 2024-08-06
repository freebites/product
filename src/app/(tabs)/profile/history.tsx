import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { globalStyles } from "@components/global";
import Header from "@components/common/Header";
import { useAuth, validateRoutePerms } from "@context/auth";
import { getAllPosts } from "@api/posts/read";
import { postType } from "freebites-types";
import { router } from "expo-router";
import HomePost from "@components/home/HomePost";
import { RefreshControl } from "react-native-gesture-handler";
import MissingContentTemplate from "@components/common/MissingContent";

// use local search parameters
const History = () => {
  validateRoutePerms();
  const { user } = useAuth();
  const [AllPosts, setPosts] = useState<postType[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getYourPosts = async () => {
    const postData = await getAllPosts();

    const filteredData = postData.filter((eachPost: postType) => {
      return eachPost.postedBy === user.uid;
    });

    setPosts(filteredData);
  };

  useEffect(() => {
    getYourPosts();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header text="History" />
      {AllPosts.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.postContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getYourPosts} />
          }
        >
          {AllPosts.map((eachPost: postType) => {
            return (
              <HomePost
                style={styles.postCard}
                key={eachPost._id}
                post={eachPost}
                setRefreshing={setRefreshing}
                fetchData={getYourPosts}
                onPress={() =>
                  router.push({
                    pathname: "/postPopUp",

                    params: { id: eachPost._id },
                  })
                }
              />
            );
          })}
        </ScrollView>
      ) : (
        <MissingContentTemplate
          title={"No history yet"}
          body={
            "Try making a post by clicking on the + button on the homepage!"
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    rowGap: 15,
    width: 345,
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
  textContainer: {
    margin: "5%",
    width: "65%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textBody: {
    textAlign: "center",
    color: "#505A4E",
    opacity: 0.57,
  },
});

export default History;
