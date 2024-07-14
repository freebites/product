import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import TagButton from "./TagButton";
import { PostContext } from "../../context/postContext";
import FilterModal from "./FilterModal";
import OtherButton from "./OtherButton";

// takes in a changeHandler function for an array, (a setState function)
// and an array of strings, tagOptions, to denote the options
// it will append/cut selected/unselected buttons to the array
// TODO: add 'other' option
interface TagMultiSelectProps {
  changeHandler: (tags: string[]) => void;
  tagOptions: string[];
  type: string;
}
const TagMultiSelect = (props: TagMultiSelectProps) => {
  const { changeHandler, tagOptions, type } = props;
  // local tags copy for editing/rendering buttons

  const { postData } = useContext(PostContext);
  const tagList = type == "diet" ? postData.tags.diet : postData.tags.allergens;

  const [other, setOther] = useState(false);

  const handleTagSelection = (tag: string) => {
    let newTags = [];
    if (tagList.includes(tag)) {
      // if tag is in the tags array, remove from the array
      newTags = tagList.filter((t) => t !== tag);
    } else {
      // update the array with the new tag
      newTags = [...tagList, tag];
    }

    // only after new tags are updated do we pass them into the setStates
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
