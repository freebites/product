import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { tags } from "../../../types/PostTypes";
import { CardTag } from "../common/CardTag";
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

  // let perishableElement = null;
  // let allergenElements = null;
  // let dietElements = null;

  // if (perishable) {
  //   perishableElement = <Image source={perishableImg} />;
  // }

  // allergenElements = allergens.map((allergen, index) => {
  //   switch (allergen) {
  //     case "peanut":
  //       return <Text key={index}>Peanut</Text>;
  //     case "dairy":
  //       return <Image key={index} source={lactose} />;
  //     case "tree nut":
  //       return <Text key={index}>Tree nut</Text>;
  //     default:
  //       return null;
  //   }
  // });

  // dietElements = diet.map((dietType, index) => {
  //   switch (dietType) {
  //     case "vegetarian":
  //       return <Image key={index} source={vegetarian} />;
  //     case "vegan":
  //       return <Text key={index}>Vegan</Text>;
  //     default:
  //       return null;
  //   }
  // });

  return (
    <View style={styles.container}>
      <CardTag tag={perishable} />
      {allergens.map((allergen, index) => (
        <CardTag key={index} tag={allergen} />
      ))}

      {diet.map((eachdiet, index) => (
        <CardTag key={index} tag={eachdiet} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
export default DisplayTags;
