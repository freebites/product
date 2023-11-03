import {Image, View, Text, StyleSheet} from "react-native";
import React, { forwardRef } from "react";
import { useState } from "react";
import styled from "styled-components/native";
import * as postType from "../../context/postContext"
import { StyleSheetContext } from "styled-components";
import { faBookmark } from '@fortawesome/free-solid-svg-icons/faBookmark'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const HomePost = (props) => {
    // const [postData, setPostData] = useState<typeof dummyData>();
    const dummyData: postType.postType = {
		title: "testtitle",
		description: "testDes",
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

    return (
		<View style = {styles.mainbox}>
		
			<View style = {styles.imagebox}> 
			<Image
				source = {{
					uri: dummyData.imageURIs[0]
				}}

				style = {styles.image}
			/>
			</View>
			<View style = {styles.description}>
				<View style = {styles.title}>
					Pizzas
					<FontAwesomeIcon icon = {faBookmark} style = {styles.bookmark}/>
				</View>
			</View>
		</View>
		
	);
};

const styles = StyleSheet.create({
	mainbox: {
		width: '100%',
		backgroundColor: 'white',
		height: 151,
		borderRadius: 20,
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		paddingHorizontal: 15,
		paddingVertical: 15,

		flexDirection: "row",
	},
	imagebox: {
		flex: 1,
		width: 85,
		marginRight: 10,
	}, 
	image: {
		flex: 1,
		borderRadius: 15,
	},
	description: {
		flex: 3,
		marginLeft: 10,
		flexDirection: "column",
	},
	title: {
		height: 25,
		flexDirection: "row",
		justifyContent: "flex-end",
		flex: 1,
	},
	bookmark: {
		flex: 1,
		width: 10,
	},
})

export default HomePost;
