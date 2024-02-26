import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from "react-native";
import { Link } from "expo-router";
import React, { useContext, useState } from "react";
import BackButton from "../../../components/common/BackButton";
import { PostContext } from "../../../context/postContext";
import TagButton from "../../../components/post/TagButton";
import TagMultiSelect from "../../../components/post/TagMultiSelect";
import PlainButton2 from "../../../components/common/PlainButton2";
import BinarySelect from "../../../components/common/BinarySelect";
import ImageViewer from "../../../components/common/ImageViewer";
import { postStyles } from "./styles/postStyles";
import { COLORS } from "../../../constants";
import HorizontalRule from "../../../components/common/HorizontalRule";
import NextButtonText from "../../../components/post/NextButtonText";

const placeholder = require("../../../assets/images/kemal.jpg");
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
		<SafeAreaView style={postStyles.container}>
			<ScrollView contentContainerStyle={postStyles.scrollContainer}>
				<ImageViewer
					placeholderImageSource={placeholder}
					selectedImage={postData.imageURIs}
				/>
				<View
					style={[
						postStyles.sectionContainer,
						{ marginHorizontal: 0, width: "75%" },
					]}
				>
					<Text style={postStyles.pageHeader}>
						Food type? Diets? Allergies?
					</Text>
					<Text style={postStyles.pageH2}>
						Help your peers better navigate their options by
						selecting the following filters!
					</Text>
					<Text style={postStyles.pageH3}>
						Eg. Select vegan if there are vegan options available.
					</Text>
				</View>

				<HorizontalRule color="rgba(147, 163, 143, 0.40)" />

				<View style={postStyles.sectionContainer}>
					<Text style={postStyles.sectionHeader}>
						Perishable <Text style={{ color: "red" }}>*</Text>
					</Text>
					<BinarySelect onPress={handleUpdatePerishable} />
				</View>

				<HorizontalRule color="rgba(147, 163, 143, 0.40)" />

				<View style={postStyles.sectionContainer}>
					<Text style={postStyles.sectionHeader}>Allergies </Text>
					<TagMultiSelect
						changeHandler={handleUpdateAllergens}
						tagOptions={["peanut", "tree nut", "dairy", "eggs"]}
					/>
				</View>

				<View style={postStyles.sectionContainer}>
					<Text style={postStyles.sectionHeader}>
						Dietary Restrictions{" "}
					</Text>
					<TagMultiSelect
						changeHandler={handleUpdateDiets}
						tagOptions={[
							"Vegan",
							"Vegetarian",
							"Dairy-free",
							"Halal",
							"Gluten-free",
						]}
					/>
				</View>
			</ScrollView>

			<Link href="/post/location" asChild>
				<NextButtonText validInput={false} />
			</Link>
		</SafeAreaView>
	);
};

export default tags;
