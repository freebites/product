import {View, Text, SafeAreaView} from "react-native";
import {Link, router} from "expo-router";
import React from "react";
import BackButton from "../../../components/common/BackButton";
import { postType } from "../../../context/postContext";

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
        <SafeAreaView
            style = {{
                flex : 1, 
                justifyContent : "center",
            }}>
                
            <BackButton /> 
            {dummyData.title}
            {dummyData.description}
        </SafeAreaView>
    );
};



export default postPopUp;
