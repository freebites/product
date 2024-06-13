import { Link, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";
import GalleryButton from "../../../components/post/GalleryButton";
import { PostContext } from "../../../context/postContext";
import { EmptyPost } from "../../../../types/PostTypes";
import { manipulateAsync } from "expo-image-manipulator";
import NextButton from "../../../components/post/NextButton";
import { Camera, CameraType } from "expo-camera/legacy";
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, Alert } from "react-native";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../firebase";
import { getOneUser, updateUser } from "../../../../api/user/usercrud";
import { useAuth } from "../../../context/auth";
import EditProfileHeader from "components/profile/EditProfileHeader";

export default function openCamera() {
  const { postData, updatePostData } = useContext(PostContext);
  const { profile } = useLocalSearchParams();
  const cameraRef = useRef<Camera>(null);
  const { user } = useAuth();

  
  // handler for storing image URIs
  const handleUpdateImages = (imageLinks: string[]) => {
    // append image links to old array
    const updatedImageURIs = [...postData.imageURIs, ...imageLinks];

    updatePostData({
      ...postData,
      imageURIs: updatedImageURIs,
    });
  };

  // states for camera usage
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  // function for adding camera picture to context.
  const takePhoto = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      if (photo.hasOwnProperty("uri")) {
        // compress images
        const manipulateResult = await manipulateAsync(
          photo.uri,
          [],
          { compress: 0.2 } // from 0 to 1 "1 for best quality"
        );
        if (profile) {
          uploadPicture(manipulateResult.uri);
        } else {
          handleUpdateImages([manipulateResult.uri]);
        }
      }
    }
  };

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
  //////////////
  //
  // camera rendering
  //
  //////////////
  // ask for permissions before:
  // note: during testing, our phones already gave permissions automatically
  // and we're not sure if this is because it persists across loading or not 
  if (permission == null) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <Link href={profile ? `/(tabs)/profile` : `/(tabs)/home`} asChild>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                updatePostData(EmptyPost);
              }}
            >
              <Text style={styles.closeText}>x</Text>
            </TouchableOpacity>
          </Link>
          <View style={styles.galleryContainer}>
            <GalleryButton onPress={handleUpdateImages}></GalleryButton>
          </View>

          <View style={styles.borderContainer}>
            <View style={styles.border}>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={takePhoto}
              ></TouchableOpacity>
            </View>
          </View>
          {profile ? null : (
            <Link href="/post/add-title" asChild>
              <NextButton
                style={styles.nextButtonPosition}
                validInput={postData.imageURIs.length !== 0}
              />
            </Link>
          )}
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    margin: 15,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  closeButton: {
    width: 70,
    height: 70,
    borderColor: "white",
    zIndex: 1,
    alignContent: "center",
    paddingLeft: 10,
  },
  closeText: {
    fontFamily: "Arial",
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
  },
  galleryContainer: {
    position: "absolute",
    bottom: 0, // Adjust the bottom offset as needed
    left: 15,
  },
  cameraButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: "lightgray",
    borderWidth: 2,
    backgroundColor: "white",
    zIndex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  borderContainer: {
    position: "absolute",
    bottom: 60, // Adjust the bottom offset as needed
    right: "35%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  border: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 6,
    borderColor: "white",
  },
  nextButtonPosition: {
    position: "absolute",
    bottom: 30,
    left: "75%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
