
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
// import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
  } from '@gorhom/bottom-sheet';
import InfoPopUp  from "./InfoPopUp";
const logo = require("../../assets/icons/freebites/FreeBitesLogoSmall.png")

export const InfoModal = (props) => {


    return (
        <Modal
            visible={props.modalVisible}
            transparent={true}
            animationType="fade"
        >
            <Pressable style={styles.modalContent}>
                <Pressable>
                    <InfoPopUp setModalVisible={props.setModalVisible} />
                </Pressable>
            </Pressable>
            
        </Modal>
        
    );

};
const styles = StyleSheet.create({
    modalContent: {
        width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		alignItems: "center",
        flex: 1.5,
        justifyContent: "flex-end",
    },
});
export default InfoModal;