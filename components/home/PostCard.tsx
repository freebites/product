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
const modalHandle = require("../../assets/images/Drag_handle.png");
const perishable = require('../../assets/images/perishable.png');
const gluten = require('../../assets/images/gluten-free.png');
const leftArrow = require('../../assets/icons/freebites/left-arrow.png');
const elipsis = require('../../assets/icons/freebites/ellipsis-horizontal.png');
const infoIcon = require('../../assets/icons/freebites/information-circle.png');

export const PostCard = (props) => {
	const { user } = useAuth();
    const [newCommentText, setNewCommentText] = useState("");
	const [singlePost, setSinglePost] = useState(EmptyPost);
	const [imageURL, setImageURL] = useState(null);
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

	const handleCommentChange = (text) => {
		setNewCommentText(text);
	};

    const handleUpdateComments = async (newComment) => {
		try {
			const updatedComments = [...props.singlePost.comments, newComment];
			const updatedPost = { ...props.singlePost, comments: updatedComments };
			props.setSinglePost(updatedPost);
			await update(updatedPost, updatedPost._id);
		} catch (error) {
			console.error("Error updating comments:", error);
		}
	};

	const handleAddComment = () => {
		const newComment: comment = {
			id: props.singlePost.comments.length + 1,
			username: "props.user.email",
			body: newCommentText,
			timestamp: new Date(),
			_id: "",
		};

		handleUpdateComments(newComment);

		setNewCommentText("");
	};

	const translateY = useSharedValue(0);

	const [modalVisible, setModalVisible] = useState(false);
    
    const changeModalVisible = () => {
        setModalVisible(!modalVisible);
    };

	function goBack() {
		router.back();
	}

	const panGesture = useAnimatedGestureHandler({
	onActive: (event) => {
			translateY.value = event.translationY
		},
	})

	const rStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: translateY.value,
				},
			],
		};
	});



//   const panGestureEvent = useAnimatedGestureHandler({
//     onStart: (_, ctx) => {
//       ctx.startY = translateY.value;
//     },
//     onActive: (event, ctx) => {
//       translateY.value = ctx.startY + event.translationY;
//     },
//     onEnd: () => {
//       // Perform any cleanup or final actions if needed
//     },
//   });

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			keyboardVerticalOffset={100}
			behavior={"position"}
		>
		<InfoModal></InfoModal>
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
				<TouchableOpacity onPress={() => CommentsModal(props)}>
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
			{/* <Divider orientation="horizontal" style={styles.divider} /> */}
			{/* <Text style={styles.thread}>Live Thread</Text> */}

		</View>
		{/* <PanGestureHandler onGestureEvent={panGesture}>
			<Animated.View style={[styles.modalComments, rStyle]}>
			<View style={{ alignItems: "center", paddingBottom: 10, paddingTop: 20 }}>
			<Image source={modalHandle} style={{ marginBottom: 14 }}/>
			<Text style={{ fontSize: 15, color: "black", fontWeight: "bold", }}>Live Thread</Text>
			</View>
			<Divider
				orientation="horizontal"
				style={styles.divider}
			/>
			<ScrollView style={{ flex: 1, paddingTop: 10, }}>
				<DisplayComments
					// modalVisible={modalVisible}
					singlePost={singlePost}
					// setModalVisible={setModalVisible}
				/>
			</ScrollView>
			<View style={{
				flexDirection: "row", marginBottom: 40, marginHorizontal: 30, marginTop: 10
			}}>
				<Image
					source={require('../../assets/icons/freebites/3d_avatar_25.png')}
				/>
				<View style={styles.textBox}>
					<TextInput style={styles.textInput}
						placeholder="Add a comment..."
						value={newCommentText}
						onChangeText={handleCommentChange}
					/>

					<TouchableOpacity style={styles.postButton}>
						<Text
							style={{ color: "lightgreen" }}
						>
						</Text>
						<TouchableOpacity onPress={handleAddComment} >
							<Image source={require('../../assets/icons/freebites/arrow-up-circle.png')} />
						</TouchableOpacity>

					</TouchableOpacity>
				</View>

			</View>


			</Animated.View>
		</PanGestureHandler> */}
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
	divider: {
		width: "100%",
		backgroundColor: "#F3F0F4",
		color: "#F3F0F4",
	},
	thread: {
		fontSize: 20,
		paddingBottom: 8,
		color: "#1c1c1b",
		fontWeight: "600",
		paddingRight: 15,
	},
	postButton: {
		alignItems: "flex-end",
		marginBottom: 10,
		marginRight: 10,
	},
	modalComments: {
		height: "65%",
		width: "113%",
		zIndex: 10000,
		backgroundColor: "white",
		borderColor: "#F3F0F4",
		borderStyle: "solid",
		borderWidth: 2,
		position: "absolute",
		top: 530,
		flexDirection: "column",
		borderRadius: 40,
		justifyContent: 'center',
	},
	modalAddComment: {
		height: 100,
		width: "100%",
		backgroundColor: "white",
		position: "absolute",
		bottom: 0,
	},

	textBox: {
		borderStyle: "solid",
		borderWidth: 1,
		marginLeft: 20, 
		flexDirection: "row",
		borderRadius: 15,
		borderColor: "#F3F0F4",
	},

    textInput: {
		fontSize: 16,
		marginRight: 75,
		// fontColor: "black",
	},
	
});
export default PostCard;










// const panGesture = useAnimatedGestureHandler({
// 	onActive: (event) => {
// 		translateY.value = event.translationY
// 	},
// })

// const rStyle = useAnimatedStyle(() => {
// 	return {
// 		transform: [
// 			{
// 				translateY: translateY.value,
// 			},
// 		],
// 	};
// });


// const [modalVisible, setModalVisible] = useState(false);

// return (
// 	<View style={styles.mainbox}>
// 		<Image
// 			style={styles.image}
// 			source={{
// 				uri: imageURL,
// 			}}
// 		/>
// 		<View style={styles.description}>
// 			<Text style={styles.location}>{singlePost.location}</Text>
// 			<Text style={styles.innerDes}>{singlePost.description}</Text>
// 			{/* <View style={styles.tags}></View> */}
// 			<Divider orientation="horizontal" style={styles.divider} />
// 			<Text style={styles.thread}>Live Thread</Text>

// 		</View>
// 		<PanGestureHandler onGestureEvent={panGesture}>
// 			<Animated.View style={[styles.modalComments, rStyle]}>
// 			<View style={{ alignItems: "center", paddingBottom: 10, paddingTop: 20 }}>
// 				<Text style={{ fontSize: 18, color: "black" }}>Live Thread</Text>
// 			</View>
// 			<Divider
// 				orientation="horizontal"
// 				style={styles.divider}
// 			/>
// 			<ScrollView style={{ flex: 1, paddingTop: 10, }}>
// 				<DisplayComments
// 					modalVisible={modalVisible}
// 					singlePost={singlePost}
// 					setModalVisible={setModalVisible}
// 				/>
// 			</ScrollView>
// 			<View style={{
// 				flexDirection: "row", marginBottom: 40, marginHorizontal: 60, marginTop: 10
// 			}}>
// 				<Image
// 					source={require('../../assets/icons/freebites/3d_avatar_25.png')}
// 				/>
// 				<View style={{ borderStyle: "solid", borderWidth: 1, marginLeft: 20, flexDirection: "row" }}>
// 					<TextInput
// 						style={{ fontSize: 16, marginRight: 75, }}
// 						placeholder="Add a comment..."
// 						value={newCommentText}
// 						onChangeText={handleCommentChange}
						
// 					/>

// 					<TouchableOpacity style={styles.postButton}>
// 						<Text
// 							style={{ color: "lightgreen" }}
// 						>
// 						</Text>
// 						<TouchableOpacity onPress={handleAddComment} >
// 							<Image source={require('../../assets/icons/freebites/arrow-up-circle.png')} />
// 						</TouchableOpacity>

// 					</TouchableOpacity>
// 				</View>

// 			</View>


// 			</Animated.View>
// 		</PanGestureHandler>
// 	</View >
// );



{/* <View style={styles.mainbox}>
				<Image
					style={styles.image}
					source={{
						uri: imageURL,
					}}
				/>
				<View style={styles.description}>
					<Text style={styles.location}>{singlePost.location}</Text>
					<Text style={styles.innerDes}>{singlePost.description}</Text>
					<View style={styles.tags}></View>
					<Divider orientation="horizontal" style={styles.divider} />
					<Text style={styles.thread}>Live Thread</Text>

				</View>
				<CommentsModal
					singlePost={singlePost}
					setSinglePost={setSinglePost}
				/>
			</View > */}