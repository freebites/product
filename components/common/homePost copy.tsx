import {Image, View, Text, StyleSheet, Pressable} from "react-native";
import React, { forwardRef } from "react";
import { useState } from "react";
import styled from "styled-components/native";
import * as postType from "../../context/postContext"
import { StyleSheetContext } from "styled-components";
import { faBookmark } from '@fortawesome/free-solid-svg-icons/faBookmark'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TouchableOpacity } from "react-native-gesture-handler";



const dummyData: postType.postType = {
	title: "testtitle",
	description: "testDes",
	imageURIs: ['../../assets/images/the-pizza-box.jpeg', '../../assets/images/bookmark_empty.png'],
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

const HomePost = (props, ref) => {
    // const [postData, setPostData] = useState<typeof dummyData>();
    return (
		
			<Pressable style = {styles.mainbox}
				ref = {ref}
				onPress = {props.onPress}
				>
		
				<View style = {styles.imagebox}> 
				<Image
					source = {{
						uri: dummyData.imageURIs[0]
					}}

					style = {styles.image}
				/>
				</View>
				<View style = {styles.sidebox}>
					<View style = {styles.bookmark}>
						<FontAwesomeIcon icon = {faBookmark} />
					</View>
					<View style = {styles.location}> 
						{dummyData.location}
					</View>
			</View>
		</Pressable>
			
	);
};

const styles = StyleSheet.create({
	mainbox : {
		backgroundColor : 'white',
		height : 151,
		// elevation: 5,

		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 4,  
		borderRadius : 20,
		paddingHorizontal: 15,
		paddingVertical: 15,

		flexDirection: 'row'
	},
	imagebox : { 
		// flex : 1,
		width: 85,
		marginRight: 10,
	},
	image : {
		flex : 1,
		borderRadius : 15,
	},
	sidebox : {
		flex : 3,
		marginLeft: 10,
		flexDirection : "column",
	},
	location : {
		height : 25,
		flexDirection : 'row',
	},
	bookmark : {
		alignSelf : "flex-end",
		marginRight : 20,
		height : 25,
		flexDirection : 'row',
		// // marginLeft : 100,
		// width : 10,
	},	
	description : {
		height : 45
		
	}


})

export default forwardRef (HomePost);
