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
import { Divider } from "react-native-elements";
import { getOne } from "../../api/posts/read";
import { getDownloadURL, ref } from "firebase/storage";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import update from "../../api/posts/update";
import { color } from "react-native-elements/dist/helpers";
import { storage } from "../../firebase";
import { useAuth } from "../../context/auth";
const placeholderImage = require("../../assets/images/kemal.jpg")

export const DisplayComments = (props) => {
    return (
        <View>
            {props.singlePost.comments.length > 0 ? (
                props.singlePost.comments.map((comment) => (
                    <View style={styles.comments} key={comment.id}>
                        <Image
                            source={require('../../assets/icons/freebites/3d_avatar_25.png')}
                        />
                        <View style={{ paddingLeft: 20 }}>
                            <Text style={styles.username}>
                                {comment.username}
                            </Text>
                            <Text style={styles.body}>
                                {comment.body}
                            </Text>
                            <Text style={styles.reply}>
                                Reply
                            </Text>
                        </View>

                    </View>
                ))
            ) : (
                <View style={styles.modalNoComments}>
                    <Text style={{ fontSize: 22, color: "#485445", fontWeight: "bold", marginTop: 100,  }}>No comments yet</Text>
                    <Text style={{ fontSize: 13, color: "#93A38F", marginTop: 20, textAlign: "center",}}>
                        Commenting helps other users know {"\n"}
                        more about the status of the food!
                    </Text>
                </View>
            )
            }
        </View>
    );

};
const styles = StyleSheet.create({
    comment: {
        fontWeight: "bold",
    },
    body: {
        fontSize: 14,
        fontWeight: "400",
        paddingBottom: 5,
    },
    comments: {
        flexDirection: "row",
        paddingBottom: 10,
        paddingTop: 10,
        flex: 1,
        paddingLeft: 0,

    },
    modalNoComments: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    noComments: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    username: {
        fontSize: 18,
        fontWeight: "400",
    },

    reply: {
        fontSize: 9,
        color: "rgba(174, 169, 177, 1)",
        fontWeight: "bold",
    },
});
export default DisplayComments;