
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
    FlatList
} from "react-native";
import React, { useMemo, useRef, useCallback, useContext, useEffect, useState } from "react";
import {
	EmptyPost,
	postType,
	comment,
	PostContext,
} from "../../context/postContext";
import { PostCard } from "./PostCard";
import BackButton from "../common/BackButton";
import DisplayComments from "./DisplayComments";
import { Divider } from "react-native-elements";
import { getOne } from "../../api/posts/read";
import { getDownloadURL, ref } from "firebase/storage";
import { TextInput } from "react-native-gesture-handler";
import update from "../../api/posts/update";
import { color } from "react-native-elements/dist/helpers";
import { storage } from "../../firebase";
import { useAuth } from "../../context/auth";
const modalHandle = require("../../assets/images/Drag_handle.png");

export const UploadComment = (props) => {
	const [newCommentText, setNewCommentText] = useState("");

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
    return (
        <View style={{
            flexDirection: "row", marginBottom: 20, marginTop: 30
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
    );

};
const styles = StyleSheet.create({
	textBox: {
		borderStyle: "solid",
		borderWidth: 1,
		marginLeft: 20, 
		flexDirection: "row",
		borderRadius: 15,
		borderColor: "#F3F0F4",
	},
    divider: {
		width: "100%",
		backgroundColor: "#F3F0F4",
		color: "#F3F0F4",
	},
    textInput: {
		fontSize: 16,
		marginRight: 75,
		// fontColor: "black",
	},
    postButton: {
		alignItems: "flex-end",
		marginBottom: 10,
		marginRight: 10,
	},
});
export default UploadComment;