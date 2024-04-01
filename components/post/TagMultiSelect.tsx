import { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import TagButton from "./TagButton";
import OtherButton from "./OtherButton";
import FilterModal from "./FilterModal";

// takes in a changeHandler function for an array, (a setState function)
// and an array of strings, tagOptions, to denote the options
// it will append/cut selected/unselected buttons to the array
// TODO: add 'other' option

const TagMultiSelect = ({ changeHandler, tagOptions }) => {
	// local tags copy for editing/rendering buttons
	const [tags, setTags] = useState([]);

	// unimplmented for now... TODO: ask designers how 'other' tags should be
	// implemented and how they should be displayed...should they be new buttons
	// or should they be different
	const [other, setOther] = useState(false);

	const handleTagSelection = (tag) => {
		let newTags; // temp storage variable to ensure tags are synced between
		// local useState and changeHandler

		if (tags.includes(tag)) {
			// if tag is in the tags array, remove from the array
			newTags = tags.filter((t) => t !== tag);
		} else {
			// update the array with the new tag
			newTags = [...tags, tag];
		}

		// only after new tags are updated do we pass them into the setStates
		setTags(newTags);
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
				isSelected={tags.includes(tag)}
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
