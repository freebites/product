import {Image, View, Text, StyleSheet} from "react-native";
import React, { forwardRef } from "react";
import { useState } from "react";
import styled from "styled-components/native";
import * as postType from "../../context/postContext"
import { StyleSheetContext } from "styled-components";




const HomePost = (props) => {
    // const [postData, setPostData] = useState<typeof dummyData>();
    const dummyData: postType.postType = {
		title: "testtitle",
		description: "testDes",
		imageURIs: [""],
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

    return (
		<View style = {styles.mainbox}>
        	<Text>Testing from component {dummyData.title}</Text>
		</View>
			
	);
};

const styles = StyleSheet.create({
	mainbox : {
		width : '100%',
		backgroundColor : 'white',
		height : 151,
		// elevation: 5,

		shadowColor: '#000',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.8,
		shadowRadius: 3,  
		
		borderRadius : 20,
	}
})

export default HomePost;
