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
import { postStyles } from "./add-title";
import { COLORS } from "../../../constants";
import HorizontalRule from "../../../components/common/HorizontalRule";

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
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<ImageViewer
					placeholderImageSource={placeholder}
					selectedImage={postData.imageURIs}
				/>
				<View
					style={[
						styles.sectionContainer,
						{ marginHorizontal: 0, width: "75%" },
					]}
				>
					<Text style={styles.pageHeader}>
						Food type? Diets? Allergies?
					</Text>
					<Text style={styles.pageH2}>
						Help your peers better navigate their options by
						selecting the following filters!
					</Text>
					<Text style={styles.pageH3}>
						Eg. Select vegan if there are vegan options available.
					</Text>
				</View>

				<HorizontalRule color="rgba(147, 163, 143, 0.40)" />

				<View style={styles.sectionContainer}>
					<Text style={styles.sectionHeader}>Food type?</Text>
					<BinarySelect onPress={handleUpdatePerishable} />
				</View>

				<HorizontalRule color="rgba(147, 163, 143, 0.40)" />

				<View style={styles.sectionContainer}>
					<Text style={styles.sectionHeader}>
						Perishable <Text style={{ color: "red" }}>*</Text>
					</Text>
					<BinarySelect onPress={handleUpdatePerishable} />
				</View>

				<HorizontalRule color="rgba(147, 163, 143, 0.40)" />

				<View style={styles.sectionContainer}>
					<Text style={styles.sectionHeader}>Allergies </Text>
					<TagMultiSelect
						changeHandler={handleUpdateAllergens}
						tagOptions={["peanut", "tree nut", "dairy", "eggs"]}
					/>
				</View>

				<View style={styles.sectionContainer}>
					<Text style={styles.sectionHeader}>
						Dietary Restrictions{" "}
					</Text>
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
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	scrollContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	sectionContainer: {
		justifyContent: "center",
		alignItems: "flex-start",
		width: "80%",
	},
	sectionHeader: {
		marginHorizontal: 5,
		color: "black",
		fontSize: 18,
		fontStyle: "normal",
		fontWeight: "500",
		lineHeight: 50 /* 277.778% */,
	},
	pageHeader: {
		color: "black",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "600",
	},
	pageH2: {
		color: COLORS.neutral[90],
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "400",
	},
	pageH3: {
		color: COLORS.brown[30],
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "400",
	},
});

export default tags;
