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
import HomePost from "../../../components/home/HomePost";
import { router } from "expo-router";
import { getWithFilter } from "../../../../api/posts/read";
import { PostContext } from "../../../context/postContext";
import { RefreshControl } from "react-native-gesture-handler";
import FilterList from "../../../components/home/FilterList";
import {
  AppContext,
  locationInfo,
  noLocation,
} from "../../../context/appContext";
import HomeSearchBar from "../../../components/home/HomeSearchBar";
import { useAuth } from "../../../context/auth";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import GrowToggle from "../../../components/home/GrowToggle";
import { postType } from "../../../../types/PostTypes";
import { setItem } from "../../../local-storage/asyncStorage";

const Home = () => {
  const [AllPosts, setPosts] = useState<postType[]>([]);
  const {
    filters,
    location,
    setLocation,
    userToFilter,
    setUserToFilter,
    sort,
    perishable,
  } = useContext(AppContext);
  const { user } = useAuth();
  const fetchData = async (
    query?:
      | {
          perishable?: string;
          latitude: string | number;
          longitude: string | number;
          diet?: string[];
          sort?: string;
        }
      | undefined
  ) => {
    // convert dictionary of strings to an array
    let dietArray: string[] = [];

    Object.keys(filters).forEach((option) => {
      if (filters[option]) {
        dietArray.push(filters[option]);
      }
    });

    // let query = dietArray.join(" ");
    let postData: postType[];

    // include custom query to deal with state update changes
    if (query) {
      postData = await getWithFilter({
        diet: query.diet ? query.diet : dietArray,
        latitude: query.latitude ? query.latitude : location.latitude,
        longitude: query.longitude ? query.longitude : location.longitude,
        userID: userToFilter,
        perishable: perishable,
      });
    } else {
      // usually just do this
      postData = await getWithFilter({
        diet: dietArray,
        latitude: location.latitude,
        longitude: location.longitude,
        userID: userToFilter,
        perishable: perishable,
      });
    }

    if (sort === "recent") {
      postData = postData.sort(
        (a, b) =>
          new Date(b.postTime).getTime() - new Date(a.postTime).getTime()
      );
    }

    setPosts(postData);
    setRefreshing(false);
  };

  const { postData, updatePostData } = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(true);

  const handleUpdate = (eachPostData: postType) => {
    updatePostData(eachPostData);
  };

  useEffect(() => {
    // async function
    fetchData();
    setRefreshing(true);
  }, [userToFilter, filters, sort, perishable]);

  const updateLocation = async (newLocation: locationInfo) => {
    await setItem("location", newLocation);
    setLocation(newLocation);
  };

  const updateUserToFilter = async (newUserToFilter: string) => {
    await setItem("userToFilter", newUserToFilter);
    setUserToFilter(newUserToFilter);
  };

  return (
    <View style={[globalStyles.container]}>
      <HomeSearchBar
        // if nothing is in the search bar, then clear location
        onPress={(
          details: { lat: string | number; lng: string | number } | null
        ) => {
          const newCoords =
            details != null
              ? {
                  latitude: details.lat,
                  longitude: details.lng,
                }
              : noLocation;
          updateLocation(newCoords);
          fetchData(newCoords);
          setRefreshing(true);
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          width: "60%",
          marginTop: "2%",
          marginBottom: "3%",
        }}
      >
        <GrowToggle
          selected={userToFilter == ""}
          text={"All Posts"}
          onPress={() => {
            updateUserToFilter("");
          }}
        />
        <GrowToggle
          selected={userToFilter != ""}
          text={"Your Posts"}
          onPress={() => {
            updateUserToFilter(user.uid);
          }}
        />
      </View>

      {userToFilter !== "" &&
      AllPosts.filter((eachPost: postType) => {
        return eachPost.postedBy === userToFilter;
      }).length === 0 ? (
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
          {AllPosts.map((eachPost: postType) => {
            if (userToFilter === "" || userToFilter === eachPost.postedBy) {
              return (
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
              );
            }
          })}
        </ScrollView>
      )}
    </View>
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

export default Home;
