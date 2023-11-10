import {Image, View, Text, StyleSheet, SafeAreaView} from "react-native"
import React from "react"
import * as postType from "../../context/postContext"
import { globalStyles } from "../global";
import BackButton from "./BackButton";

const dummyData: postType.postType = {
	title: "testtitle",
	description: "Pizzas, burritos, tacos",
	imageURIs: ['../../assets/images/the-pizza-box.jpeg'],
	tags: {
		perishable: true,
		allergens: ["peanuts"],
		diet: ["none"],
	},
	location: "JCC 180",
	comments: [],
	post_id: "",
	room: "123",
	postTime: new Date(),
}

export const PostCard = (props) => {
    return (
        <View style = {styles.mainbox}> 
            {dummyData.title}
            {dummyData.description}
        </View>
        
    );
};

const styles = StyleSheet.create ({
    mainbox : {
        flex : 1,
		backgroundColor : 'white',
        borderRadius : 20,
    }
})
export default PostCard;