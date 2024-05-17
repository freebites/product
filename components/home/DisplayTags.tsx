import React from 'react';
import { View, Text, Image } from 'react-native';
const vegetarian = require('../../assets/icons/freebites/vegetarian.png');
const perishableImg = require('../../assets/icons/freebites/perishable.png');
const nonperishable = require('../../assets/icons/freebites/nonperishable.png');
const msg = require('../../assets/icons/freebites/msg.png');
const lactose = require('../../assets/icons/freebites/lactose.png');

const DisplayTags = (props) => {
    const { tag } = props;

    // Destructure perishable, allergens, and diet from the tag object
    const { perishable, allergens, diet } = tag;
  
    let perishableElement = null;
    let allergenElements = null;
    let dietElements = null;

    if (perishable) {
      perishableElement = <Image source={perishableImg} />;
    }
  
    allergenElements = allergens.map((allergen, index) => {
      switch (allergen) {
        case "peanut":
          return <Text key={index}>Peanut</Text>;
        case "dairy":
          return <Image key={index} source={lactose} />;
        case "tree nut":
          return <Text key={index}>Tree nut</Text>;
        default:
          return null;
      }
    });
  
    dietElements = diet.map((dietType, index) => {
      switch (dietType) {
        case "vegetarian":
          return <Image key={index} source={vegetarian} />;
        case "vegan":
          return <Text key={index}>Vegan</Text>;
        default:
          return null;
      }
    });
  
    return (
      <View>
        {perishableElement}
        {allergenElements}
        {dietElements}
      </View>
    );
  };

export default DisplayTags;