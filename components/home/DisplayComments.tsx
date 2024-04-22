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


export const DisplayComments = (props) => {
    return (
        <View>
            {props.modalVisible ? (
                props.singlePost.comments.length > 0 ? (
                    props.singlePost.comments.map((comment) => (
                        <View style={styles.comments} key={comment.id}>
                            <Text style={styles.comment}>
                                {comment.username}
                            </Text>
                            <Text style={styles.body}>
                                {comment.body}
                            </Text>
                        </View>
                    ))
                ) : (
                    <View style={styles.modalNoComments}>
                        <Text style={ {fontSize: 22, color: "#485445"} }>No comments yet.</Text>
                        <Text style= { {fontSize: 13, color: "#93A38F"} }>
                            Commenting helps other users know <br />
                            more about the status of the food.
                        </Text>
                    </View>
                )
                
            ) : (
                props.singlePost.comments.length > 0 ? (
					props.singlePost.comments.slice(0, 3).map((comment) => (
						<TouchableWithoutFeedback
							onPress={() => props.setModalVisible(true)}
						>
							<View style={styles.comments} key={comment.id}>
								<Text style={styles.comment}>
									{comment.username}
								</Text>
								<Text style={styles.body}>{comment.body}</Text>
							</View>
						</TouchableWithoutFeedback>
					))
				) : (
					<TouchableWithoutFeedback style={styles.noComments}
						onPress={() => props.setModalVisible(true)}
					>
						<Text>Be the first to leave a comment!</Text>
					</TouchableWithoutFeedback>
				)
            )}
        </View>
    );

};
const styles = StyleSheet.create({
    comment: {
        fontWeight: "bold",
    },
    body: {
        paddingLeft: 10,
    },
    comments: {
        flexDirection: "row",
        paddingBottom: 10,
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
});
export default DisplayComments;