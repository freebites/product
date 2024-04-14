import {
	Image,
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	Button,
	Pressable,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Modal,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
	EmptyPost,
	postType,
	comment,
	PostContext,
} from "../../context/postContext";
import { CommentsModal } from "./CommentsModal";
import { InfoModal } from "./InfoModal";
import { Divider } from "react-native-elements";
import { getOne } from "../../api/posts/read";
import { getDownloadURL, ref } from "firebase/storage";
import { PanGestureHandlerGestureEvent, TextInput } from "react-native-gesture-handler";
import { router } from "expo-router";
import update from "../../api/posts/update";
import { color } from "react-native-elements/dist/helpers";
import { storage } from "../../firebase";
import { useAuth } from "../../context/auth";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming, withSpring } from "react-native-reanimated";
import DisplayComments from "./DisplayComments";
const placeholderImage = require("../../assets/images/kemal.jpg");
import styled from "styled-components/native";
import UploadComment from "./UploadComment";
const perishable = require('../../assets/images/perishable.png');
const gluten = require('../../assets/images/gluten-free.png');
const leftArrow = require('../../assets/icons/freebites/left-arrow.png');
const elipsis = require('../../assets/icons/freebites/ellipsis-horizontal.png');
const infoIcon = require('../../assets/icons/freebites/information-circle.png');

export const PostCard = (props) => {
	const { user } = useAuth();
	const [singlePost, setSinglePost] = useState(EmptyPost);
	const [imageURL, setImageURL] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
    const [commentsVisible, setCommentsVisible] = useState(false);


	useEffect(() => {
		const fetchPost = async () => {
			try {
				const postData = await getOne(props.id);
				setSinglePost(postData);
				const url = await getDownloadURL(
					ref(storage, postData.imageURIs[0])
				);
				setImageURL(url);
			} catch (error) {
				setImageURL(placeholderImage);
				console.error("Error fetching post:", error);
			}
		};

		fetchPost();
	}, [props.id]);
    
    const changeCommentsVisible = () => {
        setCommentsVisible(!commentsVisible);
    };
	const changeModalVisible = () => {
        setModalVisible(!modalVisible);
    };

	function goBack() {
		router.back();
	}

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			keyboardVerticalOffset={100}
			behavior={"position"}
		>
			<InfoModal 
				modalVisible={modalVisible} 
				setModalVisible={changeModalVisible}
			>
			</InfoModal>
			<View style={{flexDirection: "row", backgroundColor: "white", justifyContent: 'space-between', paddingHorizontal: 40}}>
				<TouchableOpacity style={{ backgroundColor: "white", width: 20 }} onPress={() => goBack()}>
					<Image source={leftArrow} />
				</TouchableOpacity>
				<Text style={styles.thread}>Post Description</Text>
				<Image source={elipsis}/>
			</View>
			<View style={styles.mainbox}>
				<Image
					style={styles.image}
					source={{
						uri: imageURL,
					}}
				/>
				<View style={styles.description}>
					<Text style={styles.location}>{singlePost.location}</Text>
					<Text style={styles.innerDes}>{singlePost.description}</Text>
					<View style={styles.info}>
						<Text style={styles.thread}>Food Types & Diet</Text>
						<TouchableOpacity onPress={() => changeModalVisible()}>
							<Image source={infoIcon} style={styles.infoIcon}/>
						</TouchableOpacity>
						
					</View>	
					<View style={styles.tags}>
						<Image
							source={gluten}
						/>
						<Image
							source={perishable}
						/>
					</View>
				</View>
				<View>
					{singlePost.comments.length > 0 ? (
						<TouchableOpacity onPress={() => changeCommentsVisible()}>
							<View style={styles.numComments}>
								<Text>View all {singlePost.comments.length} comments</Text>
							</View>
							{singlePost.comments.slice(0, 2).map((comment) => (
								<View style={styles.comments} key={comment.id}>
									<View style={{ flexDirection: "row"}}>
										<Text style={styles.username}>
											{comment.username}
										</Text>
										<Text style={styles.body}>
											{comment.body}
										</Text>
									</View>

								</View>
							))}
						</TouchableOpacity>
						) : (
							<View style={styles.noComments}>
								<Text style={{ fontSize: 22, color: "#485445", fontWeight: "bold",  }}>No comments yet</Text>
								<Text style={{ fontSize: 13, color: "#93A38F", marginTop: 20, textAlign: "center",}}>
									Commenting helps other users know {"\n"}
									more about the status of the food!
								</Text>
							</View>
						)
					}
				</View>
				<UploadComment 
					singlePost={singlePost} 
					setSinglePost={setSinglePost}
				>
				</UploadComment>
				<CommentsModal 
					changeCommentsVisible={changeCommentsVisible}
					singlePost={singlePost}
					commentsVisible={commentsVisible} 
				></CommentsModal>
			</View >
		</KeyboardAvoidingView>
		
	);
};

const styles = StyleSheet.create({
	mainbox: {
		// position: "relative",
		zIndex: 20,
		width: "100%",
		height: "100%",
		backgroundColor: "white",
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 20,
	},
	image: {
		height: 250,
		borderRadius: 15,
	},
	description: {
		height: 300,
		marginVertical: 20,
	},
	location: {
		height: 30,
		fontSize: 22,
		marginBottom: 10,
		color: "#1c1c1b",
		fontWeight: "500",
	},
	innerDes: {
		height: 50,
		// width: 200,
		marginBottom: 10,
		fontSize: 16,
		color: "#58565D",
	},
	info: {
		flexDirection: "row",
	},
	infoIcon: {
		paddingTop: 20,
		marginTop: 2,
	},
	tags: {
		height: 25,
		flexDirection: "row",
	},
	thread: {
		fontSize: 20,
		paddingBottom: 8,
		color: "#1c1c1b",
		fontWeight: "600",
		paddingRight: 15,
	},
	comments: {
		flexDirection: "row",
	},
	username: {
		paddingRight: 10,
	},
	body: {
		
	},
	noComments: {

	},
	numComments: {
		paddingBottom: 5,
	},
});
export default PostCard;