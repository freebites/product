import { Image, View, Text, StyleSheet, SafeAreaView, Button, Pressable, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { EmptyPost, postType, comment, PostContext } from "../../context/postContext";
import { Divider } from "react-native-elements";
import { getOne } from "../../server/read";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config";
import { TextInput } from "react-native-gesture-handler";
import update from "../../server/update"

const placeholderImage = require("../../assets/images/kemal.jpg");

export const PostCard = (props) => {
	// console.log(props.id);

	// const handleSubmit = (body: string) => {
	// 	const newComment = { id: 0, username: "", body, timestamp: new Date() };
	// 	setComments([...comments, newComment]);
	// };

	// const { postData, updatePostData } = useContext(PostContext);
	const [newCommentText, setNewCommentText] = useState('');

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
			// let comments = updatedComments'
			setSinglePost({
				...singlePost,
				comments: updatedComments,
			});

			// setSinglePost(prevSinglePost => ({
			// 	...prevSinglePost,
			// 	comments: updatedComments,
			// }));
			// console.log("THis is the comments in singlePost", { ...singlePost, comments: updatedComments });
			console.log("Tis is the comments in singlePost", { ...singlePost.comments });

			// await update({ ...singlePost, comments: updatedComments }, singlePost._id);
			await update({ ...singlePost }, singlePost._id);


		} catch (error) {
			console.error("Error updating comments:", error);
		}
	};

	// const handleUpdateComments = (newComments) => {
	// 	updatePostData({
	// 		...postData,
	// 		comments: [...postData.comments, newComments],
	// 	})
	// 	update(comment)
	// }

	const handleAddComment = () => {
		// Create a new comment instance
		const newComment: comment = {
			id: singlePost.comments.length + 1, // You might want to use a more sophisticated way to generate IDs
			username: 'user1', // Assuming a default username or you can get it from user authentication
			body: newCommentText,
			timestamp: new Date(),
		};

		handleUpdateComments(newComment);

		// Clear the input field
		setNewCommentText('');
	};


	// const fetchPost = async () => {
	// 	singlePost = await getOne(props.id);
	// 	// setSinglePost(postData)
	// }

	console.log(JSON.stringify(singlePost), "loooooooool");
	// console.log("location: " + singlePost.location)
	return (
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
				<View style={styles.tags}></View>
				<Divider orientation="horizontal" style={styles.divider} />
				{/* <CommentList comments={comments} setComments={setComments}></CommentList> */}
				{/* <CommentInput onSubmit={handleSubmit}></CommentInput> */}
				{/* <CommentList></CommentList> */}
				<Text style={styles.thread}>Live Thread</Text>
				{singlePost.comments.map(comment => (
					<View style={styles.comments} key={comment.id}>
						<Text style={styles.comment}>{comment.username}</Text>
						<Text style={styles.body}>{comment.body}</Text>
					</View>
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
				{/* <Button title="Post" onPress={handleAddComment} /> */}

				{/* <Pressable style={styles.post} onPress={handleAddComment} ></Pressable> */}
				<TouchableOpacity style={styles.postButton}>
					<Text
						style={{ color: "lightgreen" }}
						onPress={handleAddComment}>Post
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainbox: {
		flex: 1,
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
	}
});
export default PostCard;
