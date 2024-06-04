import { View, Text, SafeAreaView, StyleSheet } from "react-native";
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
// import { useState } from "react";

/*
	TODO: 
		- Currently the localParams in this page is the UID
		- For backend, each User should have a [postIDs] 
		- Pass in the user's postIDs instead of the whole user object
		- Display each Post
*/

// use local search parameters
const History = () => {
  validateRoutePerms();
  const [AllPosts, setPosts] = useState<postType[]>([]);
  const {
    filters,
    location,
    setLocation,
    userToFilter,
    setUserToFilter,
    sort,
  } = useContext(AppContext);

  const getYourPosts = async () => {
    // const [AllPosts, setPosts] = useState([]);
    const { user } = useAuth();
    let postData;
    postData = await getAllPosts();
    console.log(postData.length);
    postData = postData.filter((eachPost: postType) => {
      // console.log(eachPost.postedBy);
      // console.log(user.uid);
      return eachPost.postedBy == user.uid;
    });
    console.log(postData.length);

    postData.map((eachPost: postType) => {
      console.log("Found a post that you posted in post history");
      // console.log(user.uid == eachPost.postedBy);
    });

    // setPosts(postData);
    setPosts(postData);
  };

  let posts: postType[] = [];

  useEffect(() => {
    // async function
    // fetchData();
    // setRefreshing(true);
    getYourPosts();
  }, [userToFilter, filters]);
  // const { user } = useAuth();
  // let posts = getYourPosts();
  // let postData;
  // postData = getWithFilter({
  //   diet: [],
  //   latitude: 0,
  //   longitude: 0,
  //   userID: "",
  //   sort: 0,
  // });

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header text="History" />

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
          {AllPosts.map((eachPost: postType) => {
            // here?
            return (
              <HomePost
                style={styles.postCard}
                key={eachPost._id}
                post={eachPost}
                setRefreshing={() => null}
                fetchData={() => null}
                onPress={() =>
                  router.push({
                    pathname: "/postPopUp",

                    params: { id: eachPost._id },
                  })
                }
              />
              //<Text>{JSON.stringify(eachPost)}</Text>
            );
          })}
          No history yet
        </Text>
        <Text style={{ textAlign: "center", color: "#505A4E", opacity: 0.57 }}>
          Try making a post by clicking on the + button on the homepage!
        </Text>
      </View>
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
