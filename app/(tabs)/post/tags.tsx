import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import React, { useContext, useState } from "react";
import BackButton from "../../../components/common/BackButton";
import { PostContext } from "../../../context/postContext";
import TagButton from "../../../components/post/TagButton";
import TagMultiSelect from "../../../components/post/TagMultiSelect";
import PlainButton2 from "../../../components/common/PlainButton2";
import BinarySelect from "../../../components/common/BinarySelect";

// declare object that's only the tags here
const tags = () => {
	const { postData, updatePostData } = useContext(PostContext);

	// update handlers for each field
	const handleUpdateAllergens = (newAllergens) => {
		updatePostData({
			tags: { ...postData.tags, allergens: newAllergens },
		});
	};

	const handleUpdateDiets = (newDiets) => {
		updatePostData({
			tags: { ...postData.tags, diet: newDiets },
		});
	};

	const handleUpdatePerishable = (perishability) => {
		updatePostData({
			tags: { ...postData.tags, perishable: perishability },
		});
	};

	return (
		<SafeAreaView
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<BackButton />
			<View style={{ justifyContent: "center", alignItems: "center" }}>
				<Text>Perishable </Text>
				<BinarySelect onPress={handleUpdatePerishable} />
			</View>

			<View style={{ justifyContent: "center", alignItems: "center" }}>
				<Text> Allergies </Text>
				<TagMultiSelect
					changeHandler={handleUpdateAllergens}
					tagOptions={["peanut", "tree nut", "dairy", "eggs"]}
				/>
			</View>

			<View style={{ justifyContent: "center", alignItems: "center" }}>
				<Text>Dietary Restrictions </Text>
				<TagMultiSelect
					changeHandler={handleUpdateDiets}
					tagOptions={[
						"vegan",
						"vegetarian",
						"dairy-free",
						"halal",
						"gluten-free",
					]}
				/>
			</View>

			<Link href="/post/reviewpost" asChild>
				<PlainButton2 text="Review Post" />
			</Link>
		</SafeAreaView>
	);
};

export default tags;
