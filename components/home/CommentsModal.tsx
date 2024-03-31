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
const placeholderImage = require("../../assets/images/kemal.jpg")

export const CommentsModal = (props) => {
    const { user } = useAuth();
    const [newCommentText, setNewCommentText] = useState("");
    const [modalStyle, setModalStyle] = useState(false);
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

    const [modalVisible, setModalVisible] = useState(false);
    
    const changeModalStyle = () => {
        setModalStyle(!modalStyle);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
			keyboardVerticalOffset={100}
			behavior={"position"}
        >
            <Modal
                style={styles.Modal}
                animationType="slide"
                transparent={true}
                visible={true}

                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={{ flex: 0.5, top: 400, height: 100 }}>
                    <TouchableWithoutFeedback
                    onPress={() => setModalStyle(false)}>
                        <View style={[styles.modalBackground, modalStyle ? styles.modalBackgroundUP : styles.modalBackground]}></View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback 
                    onPress={() => setModalStyle(true)}>
                        <View  style={styles.modalComments}
                    >
                        <View style={{ alignItems: "center", paddingTop: 10,}}>
                            <Text style={{ fontSize: 18, color: "black" }}>Live Thread</Text>
                        </View>
                        <Divider
                            orientation="horizontal"
                            style={styles.divider}
                        />
                        <ScrollView style={{ flex: 1, paddingTop: 10, }}>
                            <DisplayComments
                                modalVisible={props.modalVisible}
                                singlePost={props.singlePost}
                                setModalVisible={props.setModalVisible}
                            />
                        </ScrollView>
                        <View style={{
                            flexDirection: "row", marginBottom: 40, marginHorizontal: 60, marginTop: 10
                            }}>
                            <Image
                                source={require('../../assets/icons/freebites/3d_avatar_25.png')}
                            />
                            <View style={{ borderStyle: "solid", borderWidth: 1, marginLeft: 20, flexDirection: "row" }}>
                                <TextInput
                                    style={{ fontSize: 16, marginRight: 75, }}
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
                    </View>
                    </TouchableWithoutFeedback>
                    
                </View>
            </Modal>
        </KeyboardAvoidingView>
        
    );

};
const styles = StyleSheet.create({
    divider: {
		width: "100%",
		backgroundColor: "#F3F0F4",
		color: "#F3F0F4",
	},
    Modal: {
        height: "50%",
    },
    modalBackground: {
        height: "40%",
        width: "100%",
        backgroundColor: "black",
        opacity: 0.6,
        zIndex: 50,
    }, 

    modalBackgroundUP:  {
        height: "50%",
    },

    modalComments: {
        height: "60%",
        width: "100%",
        zIndex: 100,
        backgroundColor: "white",
        // flex: 1,
        borderColor: "#F3F0F4",
		borderStyle: "solid",
		borderWidth: 2,
        flexDirection: "column",
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thread: {
		fontSize: 16,
		paddingBottom: 8,
		color: "#485445",
	},
    
    postButton: {
		alignItems: "flex-end",

	},
    
    modalAddComment: {
        height: 100,
        width: "100%",
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
    },
});
export default CommentsModal;