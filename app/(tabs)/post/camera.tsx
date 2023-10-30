import { View, Text, SafeAreaView } from "react-native";
import { Link, router } from "expo-router";
import React from "react";
import BackButton from "../../../components/common/BackButton";
//  1. take photo of food, add name, location, description
//  2. add filters (checkboxe4s and stuff)]
//  3. submit post (with recap of information)

// declare object that's only the image
// use ExpoCamera, save to cache, find image URI through either gallery or
// default camera URI, save URIs as an array of strings (links to the images)
const camera = () => {
	return (
		<SafeAreaView
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<BackButton />
			<Link href="/post/gallery">go to gallery</Link>
		</SafeAreaView>
	);
};

export default camera;
