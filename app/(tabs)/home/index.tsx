import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from "react-native"; // views are divs and text a p tags
import { globalStyles } from "../../../components/global";
import SearchBar from "../../../components/home/SearchBar";
import HomePost from "../../../components/home/HomePost";
import { router } from "expo-router";
import { getAllPosts } from "../../../api/posts/read";
import { PostContext, postType } from "../../../context/postContext";
import { RefreshControl } from "react-native-gesture-handler";

const Home = () => {
  const [AllPosts, setPosts] = useState([]);

  const fetchData = async () => {
    const postData = await getAllPosts();
    setPosts(postData);
    setRefreshing(false);
  };

  useEffect(() => {
    // async function
    fetchData();
  }, []);

  const { postData, updatePostData } = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(true);
  const handleUpdate = (eachPostData: postType) => {
    updatePostData(eachPostData);
  };

  const [favoriteSelected, setFavoriteSelected] = useState(true);
  return (
    <SafeAreaView style={[globalStyles.container]}>
      <SearchBar />

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-evenly",
          width: "100%",
          paddingTop: "3%",
          paddingBottom: "3%",
        }}
      >
        <View style={{ width: "30%" }}>
          <TouchableHighlight
            style={{
              borderBottomWidth: 1,
              borderColor: favoriteSelected ? "#EDA76E" : "transparent",
              alignItems: "center",
            }}
            underlayColor="transparent"
            onPress={() => setFavoriteSelected(true)}
          >
            <Text> All </Text>
          </TouchableHighlight>
        </View>

        {/* sets a border width that's normally transparent, 
						and then is tied to the 'loginSelected' boolean 
						TODO: figure out how to animate it, might need 
						a different component for this. Also make more 
						readable  */}
        <View style={{ width: "30%" }}>
          <TouchableHighlight
            style={{
              borderBottomWidth: 1,
              borderColor: !favoriteSelected ? "#EDA76E" : "transparent",
              alignItems: "center",
            }}
            underlayColor="transparent"
            onPress={() => setFavoriteSelected(false)}
          >
            <Text> Bookmark </Text>
          </TouchableHighlight>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.postContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      >
        {AllPosts.map((eachPost: postType) => {
          return (
            <HomePost
              style={styles.postCard}
              key={eachPost._id}
              post={eachPost}
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
      </ScrollView>
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

export default Home;
