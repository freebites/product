import { View, Text, SafeAreaView, Button } from "react-native";
import { Link } from "expo-router";
import React, { useContext } from "react";
import BackButton from "../../../components/common/BackButton";
import { PostContext } from "../../../context/postContext";
// declare object that's only the tags here
const tags = () => {
	const { postData, updatePostData } = useContext(PostContext);

	const hi = true;
	const handleUpdateData = () => {
		updatePostData({ title: "food1", description: "yummy food" }); // Update multiple values
		console.log("updating values");
	};

	return (
		<SafeAreaView
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<BackButton />
			<Button title="Update Data" onPress={handleUpdateData} />
			<Link href="/post/reviewpost">Review Post</Link>
			<Text>Title: {postData.title}</Text>
			<Text>Description: {postData.description}</Text>
		</SafeAreaView>
	);
};

export function exportTags() {}
export default tags;
