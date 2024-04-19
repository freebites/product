
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
const logo = require("../../assets/icons/freebites/FreeBitesLogoSmall.png")

export const InfoPopUp = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={logo}/> 
            </View>
            <View style={styles.infoContainer}>
                <View>
                    <Text style={styles.infoTitle}>List of Food Types & Dietary Restrictions</Text>
                </View>
                <Divider
                    orientation="horizontal"
                    style={styles.divider}
                />
                <View style={styles.foodContainer}>
                    <Text style={styles.dietTitle}>Food Types:</Text>
                    <ul style={styles.ul}>
                        {[
                            { id: 1, name: 'Perishable: ', description: 'spoiles quickly (cooked/fresh)' },
                            { id: 2, name: 'Non-perishable: ', description: 'lasts long (preserved)' },
                        ].map(item => (
                            <li key={item.id.toString()}>
                                <Text style={styles.foodTypeName}>{item.name}</Text>
                                <Text style={styles.foodTypeDescription}>{item.description}</Text>
                            </li>
                        ))}
                    </ul>
                    <Text style={styles.dietTitle}>Dietary Restrictions:</Text>
                    <ul style={styles.ul}>
                        {[
                            { id: 1, name: 'Vegan: ', description: 'No animal products or meat' },
                            { id: 2, name: 'Vegetarian: ', description: 'Meatless' },
                            { id: 3, name: 'Kosher: ', description: 'Jewish dietary standard' },
                            { id: 4, name: 'Halal: ', description: 'Islamic dietary standard' }
                        ].map(item => (
                            <li key={item.id.toString()}>
                                <Text style={styles.foodTypeName}>{item.name}</Text>
                                <Text style={styles.foodTypeDescription}>{item.description}</Text>
                            </li>
                        ))}
                    </ul>
                </View>
            </View>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => props.setModalVisible()}
            >
                <Text style={styles.buttonText}>I got it!</Text>
            </TouchableOpacity>
        </View>

    );

};
const styles = StyleSheet.create({
    container: {
        // flex: 0.9,
        paddingBottom: 5,
		gap: 5,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 5,
    },
    infoContainer: {
        // flex: 0.7,
        backgroundColor: "white",
        width: '100%',
        paddingBottom: 20,
        borderRadius: 20,
    },
    infoTitle: {
        marginTop: 30,
        marginBottom: 20,
        textAlign: "center",
        fontSize: 16,
        paddingHorizontal: 20,
        // fontWeight: "500",
    },
    buttonContainer: {
        height: 40,
        backgroundColor: "orange",
        marginTop: 20,
        borderRadius: 40,
        marginBottom: 30,
        justifyContent: 'center',
    },
    divider: {
		width: "100%",
		backgroundColor: "#F3F0F4",
		color: "#F3F0F4",
	},
    foodTypeItem: {
        // paddingLeft: 5,
        flexDirection: 'row',
    },
    foodTypeName: {
        // paddingLeft: 10,
        fontWeight: "600",
        color: "black",
        fontSize: 12,

    },
    foodTypeDescription: {
        fontSize: 12,
    },
    buttonText: {
        alignSelf: 'center',
        color: "white",
        fontSize: 14,
        fontWeight: "500",
    },
    dietTitle: {
        fontWeight: "600",
        fontSize: 14,
    },
    ul: {
        marginLeft: 0,
        paddingLeft: 15,
    },
    foodContainer: {
        paddingLeft: 20,
        paddingTop: 20,
    },

});
export default InfoPopUp;