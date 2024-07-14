import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { COLORS } from "../../constants";
import React, { useContext, useState } from "react";
import SubmitButton from "./SubmitButton";
import { PostContext } from "../../context/postContext";

interface FilterPopUpProps {
  type: string;
  close: () => void;
}

const FilterPopUp = (props: FilterPopUpProps) => {
  const { type, close } = props;
  const { postData, updatePostData, tagOptions, updateTagOptions } =
    useContext(PostContext);
  const [tag, setTag] = useState("");

  const handleUpdateTags = (newTag: string) => {
    if (type == "diet") {
      // check for duplicates
      // code cleanup: factor this out by passing in a changeHandler prop?
      if (!tagOptions.diet.includes(tag)) {
        let newDietOptions = [...tagOptions.diet, newTag];
        updateTagOptions({ ...tagOptions, diet: newDietOptions });

        // add to context automatically
        let newDietTags = [...postData.tags.diet, newTag];
        updatePostData({
          tags: { ...postData.tags, diet: newDietTags },
        });
      }
    } else {
      if (!tagOptions.allergies.includes(tag)) {
        let newDietOptions = [...tagOptions.allergies, newTag];
        updateTagOptions({ ...tagOptions, allergies: newDietOptions });

        // add to context automatically
        let newAllergenTags = [...postData.tags.allergens, newTag];
        updatePostData({
          tags: { ...postData.tags, allergens: newAllergenTags },
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.caption}>
          What additional filter would you like to add?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="MSG"
          placeholderTextColor={COLORS.neutral[90]}
          multiline
          autoFocus={true}
          onChangeText={(text) => {
            setTag(text);
          }}
        />
      </View>

      <SubmitButton
        onPress={() => {
          handleUpdateTags(tag);
          close();
        }}
        validInput={tag !== ""}
        style={{
          backgroundColor: tag ? COLORS.orange[90] : COLORS.neutral[50],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  caption: {
    color: COLORS.neutral[90],
    fontSize: 14,
  },
  inputContainer: {
    width: 360,
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.40)",
    borderWidth: 1,
    borderRadius: 19,
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 14,
  },
  input: {
    backgroundColor: "white",
    width: 335,
    height: 86,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.neutral[40],
    marginTop: 20,
    paddingTop: 17,
    paddingBottom: 17,
    paddingHorizontal: 20,
  },
  container: {
    paddingBottom: 5,
    gap: 5,
  },
});

export default FilterPopUp;
