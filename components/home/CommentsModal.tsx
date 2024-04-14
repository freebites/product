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
import UploadComment from "./UploadComment";
const placeholderImage = require("../../assets/images/kemal.jpg")

export const CommentsModal = (props) => {
    const { user } = useAuth();

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
			keyboardVerticalOffset={100}
			behavior={"position"}
        >
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.commentsVisible}
            >

                <Pressable onPress={() => props.changeCommentsVisible()} style={styles.modalContent}>
                    <Pressable>
                        <View style={styles.modalComments}>
                            <View style={{ alignItems: "center", paddingTop: 10,}}>
                                <Text style={{ fontSize: 18, color: "black" }}>Live Thread</Text>
                            </View>
                            <Divider
                                orientation="horizontal"
                                style={styles.divider}
                            />
                            <ScrollView style={{ paddingTop: 10 }}>
                                <DisplayComments
                                    modalVisible={props.modalVisible}
                                    singlePost={props.singlePost}
                                    setModalVisible={props.setModalVisible}
                                />
                            </ScrollView>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </KeyboardAvoidingView>
        
    );

};
const styles = StyleSheet.create({
    modalContent: {
        width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		// justifyContent: "flex-end",
		alignItems: "center",
    },
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
        height: "50%",
        width: "100%",
        position: "relative",
        // zIndex: 100,
        backgroundColor: "white",
        // flex: 4,
        borderColor: "#F3F0F4",
		borderStyle: "solid",
		borderWidth: 2,
        // flexDirection: "column",
        borderRadius: 40,
        // justifyContent: 'center',
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