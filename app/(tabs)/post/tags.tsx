import {
	View,
	Text,
	SafeAreaView,
	Button,
	TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import React, { useContext, useState } from "react";
import BackButton from "../../../components/common/BackButton";
import { PostContext } from "../../../context/postContext";
// declare object that's only the tags here
const tags = () => {
	const { postData, updatePostData } = useContext(PostContext);

	// declares default tags
	const defaultTags = {
		perishable: true,
		allergens: [],
		diet: [],
	};

	const [perishable, setPerishable] = useState<boolean>(
		defaultTags.perishable
	);
	const [allergens, setAllergens] = useState<string[]>(defaultTags.allergens);
	const [diet, setDiet] = useState<string[]>(defaultTags.diet);
	const isSelected = true;

	const hi = true;
	const handleUpdateData = () => {
		updatePostData({
			tags: { perishable: perishable, allergens: allergens, diet: diet },
		}); // Update multiple values
		console.log("updating values");
	};

	return (
		<SafeAreaView
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<BackButton />

			<Link href="/post/reviewpost">Review Post</Link>
			<Text>Title: {postData.title}</Text>
			<FoodTypeSelect onPress={setPerishable} />
			<Text> Perishable: {perishable ? "yes" : "no"}</Text>
			<Text>Description: {postData.description}</Text>
		</SafeAreaView>
	);
};

const FoodTypeSelect = (props: { onPress?: any }) => {
	const [leftIsSelected, setLeftSelected] = useState<boolean>(true);

	return (
		<View style={{ backgroundColor: "#EDA76E", width: 100, height: 50 }}>
			<TouchableOpacity
				onPress={() => {
					setLeftSelected(true);
					props.onPress(true);
				}}
				style={{ backgroundColor: leftIsSelected ? "red" : "white" }}
			>
				<Text>Perishable</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					setLeftSelected(false);
					props.onPress(false);
				}}
				style={{ backgroundColor: leftIsSelected ? "white" : "red" }}
			>
				<Text>Non-Perishable</Text>
			</TouchableOpacity>
		</View>
	);
};

const tagBox = ({ label, checked, onChange }) => {
	const [isSelected, setSelected] = useState<boolean>(true);
	<TouchableOpacity></TouchableOpacity>;
};

export function exportTags() {}
export default tags;
