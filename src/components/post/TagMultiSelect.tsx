import { useContext, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import TagButton from "./TagButton";
import OtherButton from "./OtherButton";
import FilterModal from "./FilterModal";
import { PostContext } from "../../context/postContext";

// takes in a changeHandler function for an array, (a setState function)
// and an array of strings, tagOptions, to denote the options
// it will append/cut selected/unselected buttons to the array
// TODO: add 'other' option

const TagMultiSelect = ({ changeHandler, tagOptions, type }) => {
	// subscribe tagList to the tag array depending on the type
	const { postData } = useContext(PostContext);
	const tagList =
		type == "diet" ? postData.tags.diet : postData.tags.allergens;
	// const [tags, setTags] = useState(tagList);

	const [other, setOther] = useState(false);

	const handleTagSelection = (tag) => {
		let newTags = [];
		if (tagList.includes(tag)) {
			// if tag is in the tags array, remove from the array
			newTags = tagList.filter((t) => t !== tag);
		} else {
			// update the array with the new tag
			newTags = [...tagList, tag];
		}

		// only after new tags are updated do we pass them into the setStates
		// setTags(newTags);
		changeHandler(newTags);
	};

	const renderTags = () => {
		const availableTags = tagOptions; // array of selectable tags

		// map this array of tags to a new tagButton
		// key prop is necessary for mapping, but we otherwise don't use it
		return availableTags.map((tag, index) => (
			<TagButton
				key={index}
				tag={tag}
				onPress={() => handleTagSelection(tag)}
				isSelected={tagList.includes(tag)}
				color={undefined}
				selectedColor={undefined}
			/>
		));
	};

	return (
		<View style={styles.container}>
			{renderTags()}
			<OtherButton onPress={() => setOther(true)} />
			<FilterModal
				isVisible={other}
				children={undefined}
				onClose={() => setOther(false)}
				type={type}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
		flexWrap: "wrap",
	},
});
export default TagMultiSelect;
