import {Image, View, Text, StyleSheet, Pressable} from "react-native";
import React, { forwardRef, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components/native";
import {postType} from "../../context/postContext"
import { StyleSheetContext } from "styled-components";
import { faBookmark } from '@fortawesome/free-solid-svg-icons/faBookmark'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAllPosts, getOne } from "../read";
import create from "../create";
import { faBook } from "@fortawesome/free-solid-svg-icons";



const dummyData: postType = {
	_id : '',
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



export const HomePost = (props, ref) => {


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

				<Pressable >
					<FontAwesomeIcon icon={faBookmark} style= {styles.bookmark}/>

				</Pressable>
					<View style = {styles.location}>  
						{props.post.location}
					
					</View>
					<Text style = {styles.description}> 
						{props.post.title}
					</Text>

			</View>
		</Pressable>
			
	);
};

const styles = StyleSheet.create({
	mainbox : {
		width : '100%',
		backgroundColor : 'white',
		height : 151,
		// elevation: 5,

		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 4,  
		borderRadius : 20,
		paddingHorizontal: 20,
		paddingVertical: 15,

		flexDirection: 'row'
	},
	imagebox : { 
		// flex : 1,
		width: 135,
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
		width: 20,
		height : 25,
		flexDirection : 'row',
		alignSelf : "flex-end"

		// flex : 1,
		// width : 10,
	},
	description : {
		height : 40,
		flexDirection : 'row',
	}


})

export default forwardRef (HomePost);
