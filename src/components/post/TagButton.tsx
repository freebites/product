import React from "react";
import { TouchableOpacity, Text, StyleSheet, ColorValue } from "react-native";
import { COLORS } from "../../constants";

interface TagProps {
  tag: string;
  onPress?: (props: any) => void;
  isSelected: boolean;
  color?: ColorValue;
  selectedColor?: ColorValue;
}

/*
 * props:
 * 	tag 		  - the label of the tag.
 *  onPress 	  - the callback function for onPress
 *  isSelected    - state function tracking whether it's selected or not
 *  defaultColor  - background color when not selected. default light blue
 *  selectedColor - color when not selected. default white.
 */
const TagButton = (props: TagProps) => {
  const deselectedColor =
    props.color != null ? props.color : COLORS.neutral[30];
  const activeColor =
    props.selectedColor != null ? props.selectedColor : COLORS.neutral[70];
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.tagButton,
        {
          backgroundColor: props.isSelected ? activeColor : deselectedColor,
        },
      ]}
    >
      <Text style={styles.tagText}>{props.tag}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tagButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    margin: 5,
    borderWidth: 1,
    borderColor: `${COLORS.neutral[70]}`,
    borderRadius: 10,
  },
  tagText: {
    color: COLORS.neutral[90],
    margin: 0,
  },
});

export default TagButton;
