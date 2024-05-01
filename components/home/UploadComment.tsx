
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
    
	if (props.functionality) {
        return (
            <View style={{
                flexDirection: "row", 
				marginBottom: 40, 
				marginTop: 10,
            }}>
                <Image
                    source={require('../../assets/icons/freebites/3d_avatar_25.png')}
                />
                <View style={styles.textBox}>
                    <TextInput style={styles.textInput}
                        placeholder="Add a comment for this post..."
						placeholderTextColor={"#AEA9B1"}
                        value={newCommentText}
                        onChangeText={handleCommentChange}
                    />
					<View style={styles.rectangle}>
                        <Image source={require('../../assets/icons/freebites/rectangle-comments.png')} />
                    </View>
                    <TouchableOpacity style={styles.postButton}>
                        <TouchableOpacity onPress={handleAddComment} >
                            <Image source={require('../../assets/icons/freebites/arrow-up-circle.png')} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return (
            <View style={{
                flexDirection: "row", marginBottom: 10, marginTop: 10
            }}>
                <Image
                    source={require('../../assets/icons/freebites/3d_avatar_25.png')}
                />
                <View style={[styles.textBox, styles.textBoxCard]}>
					<View style={{justifyContent: "center"}}>
						<Text style={[styles.textInput, styles.textInputCard]}>Add a comment for this post...</Text>
					</View>
					<View style={styles.rectangle}>
                        <Image source={require('../../assets/icons/freebites/rectangle-comments.png')} />
                    </View>
                    <View style={styles.postButton}>
                        <View>
                            <Image source={require('../../assets/icons/freebites/arrow-up-circle.png')} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }

};
const styles = StyleSheet.create({
	textBox: {
		borderStyle: "solid",
		borderWidth: 1,
		marginLeft: 20, 
		flexDirection: "row",
		borderRadius: 15,
		borderColor: "#F3F0F4",
		// width: "100%",
	},
	textBoxCard: {
		flex: 1,
		justifyContent: "center",

	},
    divider: {
		width: "100%",
		backgroundColor: "#F3F0F4",
		color: "#F3F0F4",
	},
    textInput: {
		fontSize: 13,
		width: 225,
		// marginRight: 5,
		marginLeft: 10,
		fontWeight: "400",
	},
	textInputCard: {
		paddingLeft: 10,
		width: 225,
		color: "#AEA9B1",
		fontSize: 12,
	},
    postButton: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
		marginRight: 7,
		// marginBottom: 10,
		justifyContent: "center",
	},
	rectangle: {
		display: "flex",
		paddingLeft: 2,
		marginRight: 3,
		justifyContent: "center",
	}
});
export default UploadComment;