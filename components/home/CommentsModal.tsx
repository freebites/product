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
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import Modal from "react-native-modal";
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
const dragHandle = require("../../assets/images/Drag_handle.png")

export const CommentsModal = (props) => {
    const { user } = useAuth();
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
			keyboardVerticalOffset={100}
			behavior={"position"}
        >
            <Modal
                animationIn={"slideInUp"}
                // animationOut={"slideInDown"}
                onSwipeComplete={() => props.changeCommentsVisible()}
                swipeDirection="down"
                isVisible={props.commentsVisible}
            >

                <Pressable 
                    onPress={() => props.changeCommentsVisible()} 
                    style={styles.modalContent}>
                    <Pressable>
                        <View style={styles.modalComments}>
                            <View style={styles.titleContainer}>
                                <Image source={dragHandle}></Image>
                                <Text style={styles.titleText}>Live Thread</Text>
                            </View>
                            <Divider
                                orientation="horizontal"
                                style={styles.divider}
                            />
                            <ScrollView style={styles.commentThread}>
                                <DisplayComments
                                    modalVisible={props.modalVisible}
                                    singlePost={props.singlePost}
                                    setModalVisible={props.setModalVisible}
                                />
                            </ScrollView>
                            <View style={{paddingHorizontal: 30}}>
                               <UploadComment
                                singlePost={props.singlePost} 
                                setSinglePost={props.setSinglePost}
                                functionality={true}
                                ></UploadComment> 
                            </View>
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
		justifyContent: "flex-end",
		alignItems: "center",
        flex: 1,
    },
    divider: {
		width: "100%",
		backgroundColor: "#F3F0F4",
		color: "#F3F0F4",
	},
    modalComments: {
        width: "100%",
        backgroundColor: "white",
        borderColor: "#F3F0F4",
		borderStyle: "solid",
		borderWidth: 2,
        borderTopLeftRadius: 40, 
        borderTopRightRadius: 40, 
        borderBottomWidth: 0, 
        alignItems: 'center',
    },
    titleContainer: {
        alignItems: "center", 
        paddingTop: 10, 
        paddingBottom: 15,
    },
    titleText: {
        paddingTop: 10,
        fontWeight: "500",
        fontSize: 18, 
        color: "black",
    },
    commentThread: {
        height: 340,
        width: 400, 
        paddingTop: 15,
        paddingHorizontal: 35,
    },
});
export default CommentsModal;