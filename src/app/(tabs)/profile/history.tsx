import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../../components/global";
import Header from "../../../components/common/Header";
import { useAuth, validateRoutePerms } from "../../../context/auth";
import { useGlobalSearchParams } from "expo-router";
import { getWithFilter, getAllPosts } from "../../../../api/posts/read";
import { postType } from "../../../../types/PostTypes";
import { router } from "expo-router";
import HomePost from "../../../components/home/HomePost";
// import { useState } from "react";

/*
	TODO: 
		- Currently the localParams in this page is the UID
		- For backend, each User should have a [postIDs] 
		- Pass in the user's postIDs instead of the whole user object
		- Display each Post
*/

const history = () => {
  validateRoutePerms();
  // const { user } = useAuth();
  // const [AllPosts, setPosts] = useState([]);

  // let postData = await getAllPosts();
  // postData = postData.filter((eachPost: postType) => {
  //   eachPost.postedBy == user.uid;
  // });
  // let postData;
  // postData = await getWithFilter({
  //   diet: [],
  //   latitude: 0,
  //   longitude: 0,
  //   userID: "",
  //   sort: 0,
  // });

  // setPosts(postData);

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
          {/* {AllPosts.map((eachPost: postType) => {
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
          })} */}
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

export default history;
