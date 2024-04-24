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
import { CommentsModal } from "./CommentsModal";
import { Divider } from "react-native-elements";
import { getOne } from "../../api/posts/read";
import { getDownloadURL, ref } from "firebase/storage";
import { TextInput } from "react-native-gesture-handler";
import update from "../../api/posts/update";
import { color } from "react-native-elements/dist/helpers";
import { storage } from "../../firebase";
import { useAuth } from "../../context/auth";
import DisplayComments from "./DisplayComments";
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
			<CommentsModal
				singlePost={singlePost}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			></CommentsModal>
			<Image
				style={styles.image}
				source={{
					uri: imageURL,
				}}
			/>
			<View style={styles.description}>
				<Text style={styles.location}>
					{/* {singlePost.location // tempfix for now cuz place IDs are diff
						? singlePost.location.place_id
						: singlePost.location} */}
				</Text>
				<Text style={styles.innerDes}>{singlePost.description}</Text>
				{/* <View style={styles.tags}></View> */}
				<Divider orientation="horizontal" style={styles.divider} />
				<Text style={styles.thread}>Live Thread</Text>
				<DisplayComments
					modalVisible={modalVisible}
					singlePost={singlePost}
					setModalVisible={setModalVisible}
				></DisplayComments>
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
		fontSize: 22,
		marginBottom: 10,
		color: "#485445",
	},
	innerDes: {
		height: 50,
		width: 200,
		marginBottom: 10,
		fontSize: 16,
		color: "#717171",
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
		color: "#485445",
	},
	postButton: {
		alignItems: "flex-end",
	},
});
export default PostCard;
