import React from "react";
import { View, StyleSheet, Dimensions, ColorValue } from "react-native";

interface HorizontalRuleProps {
  color?: ColorValue;
  widthPercentage?: number;
}
const HorizontalRule = (props: HorizontalRuleProps) => {
  const { color, widthPercentage } = props;
  const lineColor = color ?? "black";
  const screenWidth = Dimensions.get("window").width;
  const newWidth =
    widthPercentage != null
      ? (screenWidth * widthPercentage) / 100
      : screenWidth;
  return (
    <View
      style={[
        styles.horizontalRule,
        { borderBottomColor: lineColor, width: newWidth },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontalRule: {
    borderBottomWidth: 1,
    borderBottomColor: "black", // You can set the color according to your design
    width: "100%",
    height: 1,
    marginVertical: 10,
  },
});

export default HorizontalRule;
