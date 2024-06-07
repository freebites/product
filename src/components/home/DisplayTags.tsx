import React from "react";
import { View, Text, Image } from "react-native";
import { tags } from "../../../types/PostTypes";
import { TagCard } from "../post/TagCard";
const vegetarian = require("../../assets/icons/freebites/vegetarian.png");
const perishableImg = require("../../assets/icons/freebites/perishable.png");
const nonperishable = require("../../assets/icons/freebites/nonperishable.png");
const msg = require("../../assets/icons/freebites/msg.png");
const lactose = require("../../assets/icons/freebites/lactose.png");

interface DisplayTagsProps {
  tags: tags;
}
const DisplayTags = (props: DisplayTagsProps) => {
  const { tags } = props;

  // Destructure perishable, allergens, and diet from the tag object
  const { perishable, allergens, diet } = tags;

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <TagCard tag={perishable} />
      {allergens.map((allergen, index) => (
        <TagCard key={index} tag={allergen} />
      ))}
      {diet.map((dietTag, index) => (
        <TagCard key={index} tag={dietTag} />
      ))}
    </View>
  );
};

export default DisplayTags;
