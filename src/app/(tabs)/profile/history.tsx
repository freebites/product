import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { globalStyles } from "../../../components/global";
import Header from "../../../components/common/Header";
import { useAuth, validateRoutePerms } from "../../../context/auth";
import { useGlobalSearchParams } from "expo-router";
import { getWithFilter, getAllPosts } from "../../../../api/posts/read";
import { postType } from "../../../../types/PostTypes";
import { router } from "expo-router";
import HomePost from "../../../components/home/HomePost";
import { AppContext } from "../../../context/appContext";
import { RefreshControl } from "react-native-gesture-handler";

// use local search parameters
const History = () => {
  validateRoutePerms();
  const { user } = useAuth();
  const [AllPosts, setPosts] = useState<postType[]>([]);
  const [refreshing, setRefreshing] = useState(true);

  const getYourPosts = async () => {
    let postData;
    postData = await getAllPosts();

    postData = postData.filter((eachPost: postType) => {
      return eachPost.postedBy == user.uid;
    });

    setPosts(postData);
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
        <View
          style={{
            margin: "5%",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              color: "#505A4E",
              textShadowRadius: 1,
              textShadowColor: "black",
              paddingBottom: 12,
            }}
          >
            No history yet
          </Text>
          <Text
            style={{ textAlign: "center", color: "#505A4E", opacity: 0.57 }}
          >
            Try making a post by clicking on the + button on the homepage!
          </Text>
        </View>
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
});

export default History;
