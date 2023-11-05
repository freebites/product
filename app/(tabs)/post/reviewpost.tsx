import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Link, router } from "expo-router";
import { PostContext } from "../../../context/postContext";
import BackButton from "../../../components/common/BackButton";
import PlainButton2 from "../../../components/common/PlainButton2";
import ImageViewer from "../../../components/common/ImageViewer";
const placeholder = require("../../../assets/images/kemal.jpg");
// import data1, data2

// data1.name = post.name
// data2.tags = post.tags
// ...
export default function reviewpost() {
	const { postData, updatePostData } = useContext(PostContext);
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Text>review post here</Text>
			<View>
				<ImageViewer
					placeholderImageSource={placeholder}
					selectedImage={postData.imageURIs}
				></ImageViewer>
			</View>
			<Text>Title: {postData.title} </Text>
			<Text>Description: {postData.description}</Text>
			<Text> Perishable: {postData.tags.perishable ? "yes" : "no"}</Text>
			<Text> Allergens: {postData.tags.allergens.join(", ")}</Text>
			<Text>Diets: {postData.tags.diet.join(", ")}</Text>
			<BackButton />
			<Link href="/(tabs)/home" asChild>
				<PlainButton2
					onPress={console.log(postData)}
					text="Submit Post"
				/>
			</Link>
		</View>
	);
}
