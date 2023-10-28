import {Image, View, Text} from "react-native";
import React, { forwardRef } from "react";
import { useState } from "react";
import styled from "styled-components/native";
import * as postType from "../../context/postContext"




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
        <Text>Testing from component {dummyData.title}</Text>
			
	);
};

export default HomePost;
