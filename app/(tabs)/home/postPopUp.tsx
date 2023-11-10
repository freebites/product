import {View, Text, SafeAreaView, StyleSheet} from "react-native";
import {Link, router} from "expo-router";
import React from "react";
import BackButton from "../../../components/common/BackButton";
import { postType } from "../../../context/postContext";
import PostCard from "../../../components/common/PostCard";
import { globalStyles } from "../../../components/global";


const dummyData: postType = {
	title: "Pizzas",
	description: "there are a lot!",
	imageURIs: ['../../assets/images/the-pizza-box.jpeg'],
	tags: {
		perishable: true,
		allergens: ["peanuts"],
		diet: ["none"],
	},
	location: "JCC",
	comments: [],
	post_id: "",
	room: "123",
	postTime: new Date(),
}


const postPopUp = () => {
    return (
		<SafeAreaView style = {globalStyles.container}> 

			<View style = {styles.cardbox}> 
			<PostCard  /> 
				
			</View>
			<BackButton />
		</SafeAreaView>
    );
};


const styles = StyleSheet.create ({
	cardbox : {
		height : 685,
		transform: [{translateY: 43}],
		width : 345,
		// flex: 1

	},
})

export default postPopUp;
