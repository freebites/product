import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native"; // views are divs and text a p tags
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../../context/auth";
import { globalStyles } from "../../../components/global";
import { Link } from "expo-router";

const Post = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={{ backgroundColor: "white" }}></View>
      <Text> Make a post! </Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Link href="/post/camera">
          <Text>This is the camera!</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Post;
