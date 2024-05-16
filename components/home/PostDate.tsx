
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

export const PostDate = (props) => {
    const getTimeDifference = () => {
        const now = new Date();
        const postTime = new Date(props.postDateTime);
      
        const timeSincePost = Math.abs(now.getTime() - postTime.getTime());
      
        const seconds = Math.floor(timeSincePost / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
      
        return days
            ? `${days} day${days === 1 ? '' : 's'} ago`
            : hours
                ? `${hours} hour${hours === 1 ? '' : 's'} ago`
                : minutes
                    ? `${minutes} min ago`
                    : `${seconds} sec ago`;
    };

    return (
        <Text style={styles.postDate}>{getTimeDifference()}</Text>
    );

};
const styles = StyleSheet.create({
    postDate: {
        fontSize: 14,
        color: '#666',
    },
    
});
export default PostDate;