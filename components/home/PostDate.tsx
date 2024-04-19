
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
        // const currentTime = new Date(); 

        // const timeDifference = props.postDateTime.getHours();

        // const secondsDifference = Math.floor(currentTime.getTime() - props.postDateTime.getTime() / 1000);
        // const minutesDifference = Math.floor(currentTime.getTime() - props.postDateTime.getTime() / (1000 * 60));
        // const hoursDifference = Math.floor(currentTime.getTime() - props.postDateTime.getTime() / (1000 * 60 * 60));
        // const daysDifference = Math.floor(currentTime.getTime() - props.postDateTime.getTime() / (1000 * 60 * 60 * 24));

        // if (secondsDifference < 60) {
            return `seconds ago`;
            // return `${timeDifference} seconds ago`;
        // } 
        // else if (minutesDifference < 60) {
        //     return `${minutesDifference} min ago`;
        // } else if (hoursDifference < 24) {
        //     return `${hoursDifference} hours ago`;
        // } else {
        //     return `${daysDifference} days ago`;
        // }
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