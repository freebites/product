import React from "react";
import { Text, View, StyleSheet, Image, Touchable, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../../firebase";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { getOneUser, updateUser } from "../../../api/user/usercrud";
import { useAuth } from "../../context/auth";


const placeholder = require(" ../../../assets/icons/freebites/placeholder.png");
const choosephoto = require(" ../../../assets/icons/choosephoto.png");
const camera = require(" ../../../assets/icons/camera.png");
const trash = require(" ../../../assets/icons/trash.png");

const EditModal = () => {
  const {user} = useAuth();

  const uploadPicture = async (uri: string) => {
    try {
      const userData = await getOneUser(user.uid);
      if (userData.profile) {
        const oldFileRef = ref(storage, 'profilePictures/' + userData.profile.substring(userData.profile.lastIndexOf("/") + 1));
        await deleteObject(oldFileRef); 
      }
      await updateUser({ user: {...userData, profile: uri.substring(uri.lastIndexOf("/") + 1)} , userID: user.uid }); 

      const response: any = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, 'profilePictures/' + uri.substring(uri.lastIndexOf("/") + 1));

      const snapshot = await uploadBytes(storageRef, blob);
      const fullPath = await snapshot.ref.fullPath;

      Alert.alert("Profile picture updated successfully");

      return fullPath;
    } catch (error) {
      console.error("Failed to upload picture:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 0.2,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      uploadPicture(result.assets[0].uri);
    }
  };

  const deleteProfilePicture = async () => {
    try {
      const userData = await getOneUser(user.uid);
      if (userData.profile) {
        const fileRef = ref(storage, 'profilePictures/' + userData.profile.substring(userData.profile.lastIndexOf("/") + 1));
        await deleteObject(fileRef); 
      }
  
      const updatedUserData = {
        ...userData,
        profile: null,
      };
  
      await updateUser({ user: updatedUserData, userID: user.uid });
      Alert.alert("Profile picture deleted successfully");
    } catch (error) {
      console.error("Error deleting profile picture:", error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Image
        source={placeholder}
        style={{
          width: "40%",
          height: "25%",
          resizeMode: "contain",
          marginBottom: 10,
        }}
      />
      <View
        style={{
          width: "25%",
          height: 4,
          backgroundColor: "#F19D48",
          borderRadius: 5,
          marginBottom: 15,
        }}
      ></View>

      <View style={styles.modalRow}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.modalColumns}>
            <Image source={choosephoto} />
            <Text style={{ color: "#505A4E" }}>Photo Album</Text>
          </View>
        </TouchableOpacity >
        <TouchableOpacity onPress={() => router.push({ pathname: `/post`, params: {profile : true} })}>
          <View style={styles.modalColumns}>
            <Image source={camera} />
            <Text style={{ color: "#505A4E" }}>Take a Photo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteProfilePicture}>
          <View style={styles.modalColumns}>
            <Image source={trash} style={{}} />
            <Text style={{ color: "#505A4E" }}>Remove Photo</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  modalColumns: {
    flexDirection: "column",
    alignItems: "center",
  },
  modalRow: {
    marginLeft: 10,
    flexDirection: "row",
    gap: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default EditModal;
