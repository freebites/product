import { Link } from "expo-router";
import React, { createRef, useContext, useState } from "react";
import BackButton from "../../../components/common/BackButton";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "../../../components/common/ImageViewer";
import PlainButton2 from "../../../components/common/PlainButton2";
import { PostContext } from "../../../context/postContext";
import { postStyles } from "./styles/postStyles";
import { COLORS } from "../../../constants/theme";
import { Text, SafeAreaView, ScrollView, View } from "react-native";
import PlacesSearchBar from "../../../components/common/PlacesSearchBar";
import GoogleMapView from "../../../components/common/GoogleMapView";
const placeholder = require("../../../assets/images/kemal.jpg");

/*
 * screen for adding location to the post
 */
export default function location() {
	const { postData, updatePostData } = useContext(PostContext);
	const [mapSelected, setMapSelected] = useState(false);
	// the prop GoogleMapView takes in is the opposite of locationSelected, just
	// intuitively makes more sense to code this way
	const [locationSelected, setLocationSelected] = useState(false);

	const mapRef = createRef();

	return (
		<SafeAreaView style={postStyles.container}>
			<ImageViewer
				placeholderImageSource={placeholder}
				selectedImage={postData.imageURIs}
				disabled={mapSelected}
			/>
			<View
				style={[
					postStyles.sectionContainer,
					{ marginHorizontal: 0, marginTop: 25, width: "75%" },
				]}
			>
				{!mapSelected && (
					<Text style={postStyles.pageHeader}>
						Where is the food?
					</Text>
				)}
			</View>
			<PlacesSearchBar
				onSelected={() => {
					setMapSelected(true);
					console.log("HI");
				}}
				onLocationFound={() => {
					setLocationSelected(true);
				}}
			/>

			<GoogleMapView ref={mapRef} disabled={!locationSelected} />
			<Link href="/post/reviewpost" asChild>
				<PlainButton2 text="Review Post" />
			</Link>
		</SafeAreaView>
	);
}
