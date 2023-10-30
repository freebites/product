import React, { useContext, useState } from "react";
import { View, Text, SafeAreaView, Image, TextInput } from "react-native"; // views are divs and text a p tags
import { useAuth } from "../../../context/auth";
import { globalStyles } from "../../../components/global";
import { Link } from "expo-router";
import { PostContext } from "../../../context/postContext";

const Post = () => {
	const { signOut } = useAuth();
	const { postData, updatePostData } = useContext(PostContext);

	const [title, setTitle] = useState("");

	const [descr, setDescr] = React.useState("");

	const handleUpdateData = () => {
		updatePostData({ title: title, description: descr }); // Update multiple values
	};
	return (
		<SafeAreaView
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<View style={{ backgroundColor: "white" }}></View>
			<Text> Make a post! </Text>
			<TextInput
				placeholder="Add Food Name"
				value={title}
				onChangeText={(text) => {
					setTitle(text);
					handleUpdateData();
				}}
			></TextInput>
			<TextInput
				placeholder="Write a description for each food item. Please include the name of the restaurant its from if you can！"
				multiline
				numberOfLines={4}
				maxLength={40}
				onChangeText={(text) => {
					setDescr(text);
					handleUpdateData();
				}}
				value={descr}
			></TextInput>

			<Text> Title {postData.title}</Text>
			<Text> Description {postData.description}</Text>
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<Link href="/post/camera">
					<Text>This is the camera!</Text>
				</Link>
			</View>
		</SafeAreaView>
	);
};

export default Post;
