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

export const CommentFeed = (props) => {


    return (
        <View style={styles.modalComments}>
            <View style={{ alignItems: "center", paddingBottom: 10, paddingTop: 20 }}>
                <Image source={modalHandle} style={{ marginBottom: 14 }}/>
                <Text style={{ fontSize: 15, color: "black", fontWeight: "bold", }}>Live Thread</Text>
            </View>
            <Divider
                orientation="horizontal"
                style={styles.divider}
            />
            <ScrollView style={{ flex: 1, paddingTop: 10, }}>
                <DisplayComments
                    modalVisible={props.commentsVisible}
                    singlePost={props.singlePost}
                    setModalVisible={props.setCommentsVisible}
                />
            </ScrollView>
            <View style={{
                flexDirection: "row", marginBottom: 40, marginHorizontal: 30, marginTop: 10
                }}>
                <Image
                    source={require('../../assets/icons/freebites/3d_avatar_25.png')}
                />
                <View style={styles.textBox}>
                    <TextInput style={styles.textInput}
                        placeholder="Add a comment..."
                        value={props.newCommentText}
                        onChangeText={props.handleCommentChange}
                    />
                    <TouchableOpacity style={styles.postButton}>
                        <Text
                            style={{ color: "lightgreen" }}
                        >
                        </Text>
                        <TouchableOpacity onPress={props.handleAddComment} >
                            <Image source={require('../../assets/icons/freebites/arrow-up-circle.png')} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

};
const styles = StyleSheet.create({
    modalComments: {
		height: "65%",
		width: "113%",
		zIndex: 10000,
		backgroundColor: "white",
		borderColor: "#F3F0F4",
		borderStyle: "solid",
		borderWidth: 2,
		position: "absolute",
		top: 530,
		flexDirection: "column",
		borderRadius: 40,
		justifyContent: 'center',
	},
	modalAddComment: {
		height: 100,
		width: "100%",
		backgroundColor: "white",
		position: "absolute",
		bottom: 0,
	},
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
export default CommentFeed;