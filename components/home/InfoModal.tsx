
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

export const InfoModal = (props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []); 
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

    // const handlePresentModalPress = useCallback(() => {
    //     bottomSheetRef.current?.present();
    //   }, []);
    

    // const renderBackdrop = useCallback(
    //     (props: any) => <BottomSheetBackdrop></BottomSheetBackdrop>
    // )
    
    // const changeModalStyle = () => {
    //     setModalStyle(!modalStyle);
    // };

    return (
        // <KeyboardAvoidingView
        //     style={{ flex: 1 }}
		// 	keyboardVerticalOffset={100}
		// 	behavior={"position"}
        // >
            <Modal
                style={styles.Modal}
                visible={props.modalVisible}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
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
                            <View>
                                <Text>Food Types:</Text>
                                <FlatList
                                    data={[
                                        { id: 1, name: 'Perishable: ', description: 'spoiles quickly (cooked/fresh)' },
                                        { id: 2, name: 'Non-perishable: ', description: 'lasts long (preserved)' },
                                    ]}
                                    renderItem={({ item }) => {
                                        return (
                                        <View style={styles.foodTypeItem}>
                                            <Text style={styles.foodTypeName}>{item.name}</Text>
                                            <Text style={styles.foodTypeDescription}>{item.description}</Text>
                                        </View>
                                        );
                                    }}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </View>
                            <View>
                                <Text>Dietary Restrictions:</Text>
                                <FlatList
                                    data={[
                                        { id: 1, name: 'Vegan: ', description: 'No animal products or meat' },
                                        { id: 2, name: 'Vegetarian: ', description: 'Meatless' },
                                        { id: 3, name: 'Kosher: ', description: 'Jewish dietary standard' },
                                        { id: 4, name: 'Halal: ', description: 'Islamic dietary standard' }
                                    ]}
                                    renderItem={({ item }) => {
                                        return (
                                        <View style={styles.foodTypeItem}>
                                            <Text style={styles.foodTypeName}>{item.name}</Text>
                                            <Text style={styles.foodTypeDescription}>{item.description}</Text>
                                        </View>
                                        );
                                    }}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                         style={styles.buttonContainer}
                         onPress={() => props.setModalVisible()}
                         ></TouchableOpacity>
                    </View>
                </View>
            </Modal>
        
    );

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 30,
        paddingTop: "85%",
        backgroundColor: "black", 
        opacity: 0.5,
    },
    innerContainer: {
        flex: 1,
        opacity: 1,
        width: '100%', // Full width
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    infoContainer: {
        flex: 6,
        backgroundColor: "white",
        width: '100%',
        paddingBottom: 10,
        borderRadius: 20,
    },
    infoTitle: {
        marginTop: 37,
        marginBottom: 30,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "500",
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: "orange",
        marginTop: 20,
        borderRadius: 40,
    },
    divider: {
		width: "100%",
		backgroundColor: "#F3F0F4",
		color: "#F3F0F4",
	},
    foodTypeItem: {
        paddingLeft: 5,
        flexDirection: 'row',
    },
    foodTypeName: {
        padding: 10,
        fontWeight: "300",
    },
    foodTypeDescription: {
        padding: 10,
    },
    Modal: {
        height: "50%",
    },
    modalBackground: {
        height: "40%",
        width: "100%",
        backgroundColor: "black",
        opacity: 0.6,
        zIndex: 50,
    }, 

    modalBackgroundUP:  {
        height: "50%",
    },

    modalComments: {
        height: "60%",
        width: "100%",
        zIndex: 100,
        backgroundColor: "white",
        // flex: 1,
        borderColor: "#F3F0F4",
		borderStyle: "solid",
		borderWidth: 2,
        flexDirection: "column",
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thread: {
		fontSize: 16,
		paddingBottom: 8,
		color: "#485445",
	},
    
    postButton: {
		alignItems: "flex-end",

	},
    

});
export default InfoModal;