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
import { PostCard } from "./PostCard";
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


    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
            props.setModalVisible(!props.modalVisible)
        }}
    >
        <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback
                onPress={() => props.setModalVisible(false)}
            >
                <View style={styles.modalBackground}></View>
            </TouchableWithoutFeedback>
            <View style={styles.modalComments}>
                <View style={{ alignItems: "center", paddingTop: 10,}}>
                    <Text style={{ fontSize: 18, }}>Comments</Text>
                </View>
                <Divider
                    orientation="horizontal"
                    style={styles.divider}
                />
                <DisplayComments 
					modalVisible={props.modalVisible} 
					singlePost={props.singlePost} 
					setModalVisible={props.setModalVisible}>
				</DisplayComments>

                <View style={styles.modalAddComment}>
                    <Text>Comment add</Text>
                </View>
            </View>
        </View>
    </Modal>
    );

};
const styles = StyleSheet.create({
    divider: {
        marginVertical: 15,
    },
    modalBackground: {
        height: "40%",
        width: "100%",
        // backgroundColor: "black",
        opacity: 0.6,
        zIndex: 50,
    },
    modalComments: {
        height: "60%",
        width: "100%",
        zIndex: 100,
        backgroundColor: "white",
        // flex: 1,
        flexDirection: "column",
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
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