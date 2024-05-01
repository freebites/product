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
    Keyboard
} from "react-native";
import Modal from "react-native-modal";
import React, { useMemo, useContext, useEffect, useRef, useState } from "react";
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
    const isKeyboardVisible = useRef(false);

	const keyboardDidShowListener = useRef();
	const keyboardDidHideListener = useRef();
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            // Handle keyboard show event
            // console.log('Keyboard did show');
            isKeyboardVisible.current = true;
          }
        );
    
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            // Handle keyboard hide event
            // console.log('Keyboard did hide');
            isKeyboardVisible.current = false;
          }
        );
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
        // Clean up listeners

      }, []);

      // Make sures that the backdrop does not rerender onBackdrop press
      const isBackdrop = useMemo(() => {
        // Compute the value of isBackdrop based on some condition
        // For example, you can check if props.commentsVisible is true
        return props.commentsVisible;
    }, [props.commentsVisible]);
    return (
            <Modal
                animationIn={"slideInUp"}
                animationInTiming={400}
                animationOut={"slideOutDown"}
                animationOutTiming={300}
                backdropTransitionOutTiming={10000}
                swipeThreshold={50}
                onSwipeComplete={() => props.changeCommentsVisible()}
                swipeDirection={['down']}
                isVisible={props.commentsVisible}  
                propagateSwipe={true}
                coverScreen={true}
                hasBackdrop={isBackdrop}
                onBackdropPress={() => props.changeCommentsVisible()}
                style={styles.modalContent}
            >
                <KeyboardAvoidingView 
                    behavior="position" 
                    style={{width: "100%"}}
                    keyboardVerticalOffset={-20}
                >
                    
                        <View style={styles.modalComments}>
                            <View style={styles.titleContainer}>
                                <Image source={dragHandle}></Image>
                                <Text style={styles.titleText}>Live Thread</Text>
                            </View>
                            <ScrollView style={styles.commentThread}>
                            <TouchableOpacity activeOpacity={1}
                             >
                                <DisplayComments
                                    modalVisible={props.modalVisible}
                                    singlePost={props.singlePost}
                                />
                            </TouchableOpacity>
                            </ScrollView>
                            <UploadComment
                                singlePost={props.singlePost} 
                                setSinglePost={props.setSinglePost}
                                functionality={true}
                            ></UploadComment> 
                        </View>
                </KeyboardAvoidingView>
            </Modal>
    );


};
const styles = StyleSheet.create({
    modalContent: {
        width: "100%",
		height: "100%",
        display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
        margin: 0,
    },
    divider: {
		width: "100%",
		backgroundColor: "#F3F0F4",
		color: "#F3F0F4",
	},
    modalComments: {
        backgroundColor: "white",
        borderColor: "#F3F0F4",
		borderStyle: "solid",
		borderWidth: 2,
        width: "100%",
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30, 
        borderBottomWidth: 0, 
        alignItems: 'center',
    },
    titleContainer: {
        alignItems: "center", 
        paddingTop: 5, 
        paddingBottom: 5,
    },
    titleText: {
        paddingTop: 10,
        fontWeight: "500",
        fontSize: 18, 
        color: "black",
    },
    commentThread: {
        // flex: 1,
        height: 340,
        width: "100%",
        paddingHorizontal: 35,
        borderTopColor: "#F3F0F4",
        borderTopStyle: "solid",
        borderTopWidth: 1,
        borderBottomColor: "#F3F0F4",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
    },
});
export default CommentsModal;