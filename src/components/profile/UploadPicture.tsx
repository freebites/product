import React from "react";
import { Alert } from "react-native";
import { storage } from "../../../firebase";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { getOneUser, updateUser } from "../../../api/user/usercrud";

export const uploadPicture = async (uri: string, userId: string) => {
  try {
    const userData = await getOneUser(userId);
    if (userData.profile) {
      const oldFileRef = ref(storage, 'profilePictures/' + userData.profile.substring(userData.profile.lastIndexOf("/") + 1));
      await deleteObject(oldFileRef); 
    }
    await updateUser({ user: {...userData, profile: uri.substring(uri.lastIndexOf("/") + 1)} , userID: userId }); 

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
