import React from "react";
import { COLORS } from "../../constants";
import { Text, View, StyleSheet } from "react-native";

interface TagCardProps {
  tag: string;
}
export const TagCard = (props: TagCardProps) => {
  const { tag } = props;
  return (
    <View style={styles.tagCard}>
      <Text style={styles.tagText}>{tag}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tagCard: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    margin: 5,
    borderWidth: 1,
    borderColor: `${COLORS.neutral[70]}`,
    backgroundColor: `${COLORS.orange[20]}`,
    borderRadius: 10,
  },
  tagText: {
    color: COLORS.neutral[90],
    margin: 0,
  },
});
