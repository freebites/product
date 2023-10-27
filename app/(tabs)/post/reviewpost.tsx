import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Link, router } from "expo-router";
import { PostContext } from "../../../context/postContext";
import BackButton from "../../../components/common/BackButton";

// import data1, data2

// data1.name = post.name
// data2.tags = post.tags
// ...
export default function reviewpost() {
	const { postData, updatePostData } = useContext(PostContext);
	return (
		<View style={{ alignItems: "center", justifyContent: "center" }}>
			<Text>review post here</Text>
			<Text>Title: {postData.title} </Text>
			<Text>Description: {postData.description}</Text>
			<Link href="/(tabs)/home">Submit Post</Link>
			<BackButton />
		</View>
	);
}
