import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import {
	Link,
	router,
	useLocalSearchParams,
	useNavigation,
	useRouter,
} from "expo-router";
import React, { useContext } from "react";
import BackButton from "../../../components/common/BackButton";
import { PostContext, postType } from "../../../context/postContext";
import PostCard from "../../../components/home/PostCard";
import { globalStyles } from "../../../components/global";
import post from "../../../components/common/cards/post";
import { useLocation } from "react-router-dom";

export const postPopUp = (props, state) => {
	// const { postData, updatePostData } = useContext(PostContext);
	// console.log("here" + postData)
	// const postLocation = useLocation();
	// const postData = postLocation.state?.post;
	const navigation = useNavigation();
	const router = useRouter();
	const params = useLocalSearchParams();

	console.log(JSON.stringify(params));

	return (
		<SafeAreaView style={globalStyles.container}>
			<View style={styles.cardbox}>
				<PostCard id={params.id} />
			</View>
			<BackButton />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	cardbox: {
		height: 650,
		marginTop: 50,
		width: 345,
		// flex: 1
	},
});

export default postPopUp;
