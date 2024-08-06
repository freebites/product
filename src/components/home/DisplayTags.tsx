import React, { useMemo } from "react";
import { View } from "react-native";
import { tags } from "freebites-types";
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

  // use this to catch random empty states
  const isTagsEmpty = useMemo(() => {
    return (
      (tags.perishable === "" || tags.perishable === undefined) &&
      tags.allergens.length === 0 &&
      tags.diet.length === 0
    );
  }, [tags]);
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {isTagsEmpty ? (
        <TagCard tag={"perishable"} />
      ) : (
        <TagCard tag={perishable} />
      )}
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
