import { Link } from "expo-router";
import React, { useContext, useRef } from "react";
import GalleryButton from "../../../components/post/GalleryButton";
import { PostContext } from "../../../context/postContext";
import { EmptyPost } from "../../../../types/PostTypes";
import { manipulateAsync } from "expo-image-manipulator";
import NextButton from "../../../components/post/NextButton";
import { CameraView, useCameraPermissions } from "expo-camera";
import { View, StyleSheet, Text, TouchableOpacity, Button } from "react-native";

export default function openCamera() {
  const { postData, updatePostData } = useContext(PostContext);
  const cameraRef = useRef<CameraView>(null);
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
  // const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  // function toggleCameraType() {
  //   setFacing((current) => (current === "back" ? "front" : "back"));
  // }

  // function for adding camera picture to context.
  const takePhoto = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      if (photo?.hasOwnProperty("uri")) {
        // compress images
        const manipulateResult = await manipulateAsync(
          photo.uri,
          [],
          { compress: 0.2 } // from 0 to 1 "1 for best quality"
        );
        handleUpdateImages([manipulateResult.uri]);
        //setImage(manipulateResult.uri);
      }
      // handleUpdateImages expects an array of URIs
    }
  };

  //////////////
  //
  // camera rendering
  //
  //////////////
  // ask for permissions before:
  // note: during testing, our phones already gave permissions automatically
  // and we're not sure if this is because it persists across loading or not q
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
  } else {
    return (
      <View style={styles.container}>
        <CameraView style={styles.camera} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Link href="/(tabs)/home" asChild>
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

            <Link href="/post/add-title" asChild>
              <NextButton
                style={styles.nextButtonPosition}
                validInput={postData.imageURIs.length != 0}
              />
            </Link>
          </View>
        </CameraView>
      </View>
    );
  }
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
