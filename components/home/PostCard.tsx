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
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
	EmptyPost,
	postType,
	comment,
	PostContext,
} from "../../context/postContext";
import { Divider } from "react-native-elements";
import { getOne } from "../../api/posts/read";
import { getDownloadURL, ref } from "firebase/storage";
import { TextInput } from "react-native-gesture-handler";
import update from "../../api/posts/update";
import { color } from "react-native-elements/dist/helpers";
import { storage } from "../../firebase";
import { useAuth } from "../../context/auth";
const placeholderImage = require("../../assets/images/kemal.jpg");

export const PostCard = (props) => {
	const { user } = useAuth();
	const [newCommentText, setNewCommentText] = useState("");
	const handleCommentChange = (text) => {
		setNewCommentText(text);
	};

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

	const handleUpdateComments = async (newComment) => {
		try {
			const updatedComments = [...singlePost.comments, newComment];
			const updatedPost = { ...singlePost, comments: updatedComments };
			setSinglePost(updatedPost);
			await update(updatedPost, updatedPost._id);
		} catch (error) {
			console.error("Error updating comments:", error);
		}
	};

	const handleAddComment = () => {
		const newComment: comment = {
			id: singlePost.comments.length + 1,
			username: user.email,
			body: newCommentText,
			timestamp: new Date(),
			_id: "",
		};

		handleUpdateComments(newComment);

		setNewCommentText("");
	};

	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View style={styles.mainbox}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={{ flex: 1 }}>
					<TouchableWithoutFeedback
						onPress={() => setModalVisible(false)}
					>
						<View style={styles.modalBackground}></View>
					</TouchableWithoutFeedback>
					<View style={styles.modalComments}>
						<View style={{ alignItems: "center", paddingTop: 10 }}>
							<Text style={{ fontSize: 18 }}>Comments</Text>
						</View>
						<Divider
							orientation="horizontal"
							style={styles.divider}
						/>
						<View>
							{singlePost.comments.map((comment) => (
								<View style={styles.comments} key={comment.id}>
									<Text style={styles.comment}>
										{comment.username}
									</Text>
									<Text style={styles.body}>
										{comment.body}
									</Text>
								</View>
							))}
						</View>

						<View style={styles.modalAddComment}>
							<Text>Comment add</Text>
						</View>
					</View>
				</View>
			</Modal>
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
				{singlePost.comments.slice(0, 3).map((comment) => (
					<TouchableWithoutFeedback
						onPress={() => setModalVisible(true)}
					>
						<View style={styles.comments} key={comment.id}>
							<Text style={styles.comment}>
								{comment.username}
							</Text>
							<Text style={styles.body}>{comment.body}</Text>
						</View>
					</TouchableWithoutFeedback>
				))}
			</View>
			<View style={{ flexDirection: "row" }}>
				<Divider orientation="horizontal" style={styles.divider} />
				<TextInput
					style={{ fontSize: 12, flex: 1 }}
					placeholder="Add a comment..."
					value={newCommentText}
					onChangeText={handleCommentChange}
				/>
				<TouchableOpacity style={styles.postButton}>
					<Text
						style={{ color: "lightgreen" }}
						onPress={handleAddComment}
					>
						Post
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainbox: {
		flex: 1,
		zIndex: -1,
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
		fontWeight: "bold",
		marginBottom: 10,
	},
	innerDes: {
		height: 50,
		width: 200,
		marginBottom: 10,
	},
	tags: {
		height: 25,
	},
	divider: {
		marginVertical: 15,
	},
	thread: {
		fontSize: 16,
		paddingBottom: 8,
	},
	comment: {
		fontWeight: "bold",
	},
	body: {
		paddingLeft: 10,
	},
	comments: {
		flexDirection: "row",
		paddingBottom: 10,
	},
	postButton: {
		alignItems: "flex-end",
	},
	modalBackground: {
		height: "40%",
		width: "100%",
		backgroundColor: "black",
		opacity: 0.6,
		zIndex: 50,
	},
	modalComments: {
		height: "60%",
		width: "100%",
		zIndex: 100,
		backgroundColor: "white",
		flex: 1,
		flexDirection: "column",
		borderRadius: 40,
	},
	modalAddComment: {
		height: 100,
		width: "100%",
		backgroundColor: "white",
		position: "absolute",
		bottom: 0,
	},
});
export default PostCard;
