import {
	View,
	Text,
	SafeAreaView,
	Button,
	TouchableOpacity,
	StyleSheet,
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
			<TagSelection />
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

const TagButton = ({ tag, onPress, isSelected }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[
				styles.tagButton,
				{ backgroundColor: isSelected ? "lightblue" : "white" },
			]}
		>
			<Text style={styles.tagText}>{tag}</Text>
		</TouchableOpacity>
	);
};

const TagSelection = () => {
	const [tags, setTags] = useState([]);

	const handleTagSelection = (tag) => {
		if (tags.includes(tag)) {
			// if tag is in the tags array, remove from the array
			setTags(tags.filter((t) => t !== tag));
		} else {
			setTags([...tags, tag]);
		}
	};

	const renderTags = () => {
		const availableTags = ["Tag1", "Tag2", "Tag3", "Tag4"]; // Your array of selectable tags

		// map this array of tags to a new tagButton
		return availableTags.map((tag, index) => (
			<TagButton
				key={index}
				tag={tag}
				onPress={() => handleTagSelection(tag)}
				isSelected={tags.includes(tag)}
			/>
		));
	};
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
				{renderTags()}
			</View>
			<Text>Selected Tags: {tags.join(", ")}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	tagButton: {
		padding: 10,
		margin: 5,
		borderWidth: 1,
		borderColor: "black",
		borderRadius: 5,
	},
	tagText: {
		color: "black",
	},
});
export default tags;
