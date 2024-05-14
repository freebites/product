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
    Keyboard,
    Animated,
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
    const [commentThreadHeight, setCommentThreadHeight] = useState(100); // Initial height
    const animatedHeight = useRef(new Animated.Value(commentThreadHeight)).current;
    console.log(animatedHeight);
    const [textBoxClicked, setTextBoxClicked] = useState(false); // Track whether text box is clicked


    const dismissKeyboard = () => {
        if (isKeyboardVisible.current) {
            Keyboard.dismiss();
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                isKeyboardVisible.current = true;
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                isKeyboardVisible.current = false;
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };

    }, []);

    useEffect(() => {
        if (!isKeyboardVisible.current) {
            setCommentThreadHeight(340); // Set it back to the original height
        }
    }, [isKeyboardVisible.current]);


    useEffect(() => {
        if (textBoxClicked) {
            console.log("Animating...");
            Animated.timing(animatedHeight, {
                toValue: commentThreadHeight,
                duration: 300, 
                useNativeDriver: false, 
            }).start(() => console.log("getting big"));
        }
    }, [commentThreadHeight, textBoxClicked]); // Re-run the effect whenever commentThreadHeight changes

    const handleTextBoxClick = () => {
        setTextBoxClicked(true); 
        setCommentThreadHeight(300);
    };

    // Make sures that the backdrop does not rerender onBackdrop press
    const isBackdrop = useMemo(() => {
        return props.commentsVisible;
    }, [props.commentsVisible]);

    const handleModalSwipe = () => {
        if (isKeyboardVisible.current) {
            dismissKeyboard();
        } else {
            props.changeCommentsVisible();
        }
    };

    return (
            <Modal
                animationIn={"slideInUp"}
                animationInTiming={400}
                animationOut={"slideOutDown"}
                animationOutTiming={300}
                backdropTransitionOutTiming={200}
                swipeThreshold={50}
                onSwipeComplete={handleModalSwipe}
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
                                <DisplayComments
                                    modalVisible={props.modalVisible}
                                    singlePost={props.singlePost}
                                />
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
        height: 340,
        width: "100%",
        paddingHorizontal: 35,
        borderTopColor: "#F3F0F4",
        // borderTopStyle: "solid",
        borderTopWidth: 1,
        borderBottomColor: "#F3F0F4",
        // borderBottomStyle: "solid",
        borderBottomWidth: 1,
    },
});
export default CommentsModal;