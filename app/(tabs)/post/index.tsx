import { Link } from "expo-router";
import React, { useContext, useRef, useState } from "react";
import BackButton from "../../../components/common/BackButton";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "../../../components/common/ImageViewer";
import PlainButton2 from "../../../components/common/PlainButton2";
import GalleryButton from "../../../components/common/GalleryButton";
import { PostContext } from "../../../context/postContext";
import { ScrollView } from "react-native-gesture-handler";
import { Camera, CameraType } from "expo-camera";
import {
	View,
	SafeAreaView,
	TextInput,
	StyleSheet,
	Text,
	TouchableOpacity,
	Button,
} from "react-native";

// export default function component()
export default function openCamera() {
	const { postData, updatePostData } = useContext(PostContext);
	const cameraRef = useRef(null);

	// handler for storing image URIs
	const handleUpdateImages = (imageLinks) => {
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
		if (cameraRef) {
			let photo = await cameraRef.current.takePictureAsync();
			console.log(photo.uri);
			// handleUpdateImages expects an array of URIs

			handleUpdateImages([photo.uri]);
		}

		console.log([postData.imageURIs]);
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
				<Camera style={styles.camera} type={type} ref={cameraRef}>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.button}
							onPress={toggleCameraType}
						>
							<Text style={styles.text}>Flip Camera</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.cameraButton}
							onPress={takePhoto}
						></TouchableOpacity>
						<GalleryButton onPress={handleUpdateImages}></GalleryButton>

						<Link href="/post/add-title" asChild>
							<PlainButton2 text="Next Step" />
						</Link>
					</View>
				</Camera>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "transparent",
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: "flex-end",
		alignItems: "center",
	},
	cameraButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "white",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},
});
