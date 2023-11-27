import { Link } from "expo-router";
import React, { useContext, useRef, useState } from "react";
import PlainButton2 from "../../../components/common/PlainButton2";
import GalleryButton from "../../../components/post/GalleryButton";
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
import { manipulateAsync } from "expo-image-manipulator";

// export default function component()
export default function openCamera() {
	const { postData, updatePostData } = useContext(PostContext);
	const cameraRef = useRef(null);
	// console.log(postData);
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
			//console.log(photo.uri);
			if (photo.hasOwnProperty("uri")) {
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

		//console.log([postData.imageURIs]);
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
						<Link href="/(tabs)/home" asChild>
							<TouchableOpacity style={styles.closeButton}>
								<Text style={styles.closeText}>x</Text>
							</TouchableOpacity>
						</Link>
						<View style={styles.galleryContainer}>
							<GalleryButton
								onPress={handleUpdateImages}
							></GalleryButton>
						</View>

						<View style={styles.borderContainer}>
							<View style={styles.border}>
								<TouchableOpacity
									style={styles.cameraButton}
									onPress={takePhoto}
								></TouchableOpacity>
							</View>
						</View>
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
		flexDirection: 'column',
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
		alignContent: 'center',
		paddingLeft: 10,
	},
	closeText: {
		fontFamily: "Arial",
		fontSize: 50,
		color: 'white',
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
		alignContent: 'center',
		justifyContent: 'center',
	},
	borderContainer: {
		position: "absolute",
		bottom: 60, // Adjust the bottom offset as needed
		right: 150,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	border: {
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 6,
		borderColor: 'white',
	},
});
