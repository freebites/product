import {Image, View, Text, StyleSheet} from "react-native";
import React, { forwardRef } from "react";
import { useState } from "react";
import styled from "styled-components/native";
import * as postType from "../../context/postContext"
import { StyleSheetContext } from "styled-components";
import { faBookmark } from '@fortawesome/free-solid-svg-icons/faBookmark'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

 
const dummyData: postType.postType = {
	title: "Pizzas",
	description: "testDes",
	imageURIs: ['../../assets/images/the-pizza-box.jpeg'],
	tags: {
		perishable: true,
		allergens: ["peanuts"],
		diet: ["none"],
	},
	location: "JCC 160",
	comments: [],
	post_id: "",
	room: "123",
	postTime: new Date(),
}

const HomePost = (props) => {
    // const [postData, setPostData] = useState<typeof dummyData>();
    

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
						{dummyData.title}
						<FontAwesomeIcon icon={faBookmark} style = {styles.bookmark}/>
					</View>
			</View>
		</View>
			
	);
};

const styles = StyleSheet.create({
	mainbox : {
		width : '100%',
		backgroundColor : 'white',
		height : 151,
		// elevation: 5,
		paddingHorizontal : 10,
		paddingVertical: 15,

		shadowColor: '#000',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.8,
		shadowRadius: 3,  
		
		borderRadius: 20,

		flexDirection: 'row'
	},
	imagebox: {
		flex: 1,
		width: 85,
		marginRight: 10,
	},
	image: {
		flex: 1,
		width: '100%',
		borderRadius: 20,
	},
	description: {
		flex: 3,
		width : '100%',
		marginLeft: 10,
		flexDirection: 'column',

	},
	title: {
		flex: 3,
		width: '100%',
		height : 25,
	},
	bookmark: {

		alignSelf : 'flex-end',
	}
})

export default HomePost;
