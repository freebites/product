import { COLORS } from "../../constants";
import React, { Text, StyleSheet, View } from "react-native";

interface CardTagProps {
  tag: string;
}

export const CardTag = (props: CardTagProps) => {
  const { tag } = props;

  return (
    <View style={styles.tagButton}>
      <Text style={styles.tagText}>{tag}</Text>
    </View>
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
