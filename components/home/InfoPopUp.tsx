import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";

import { Divider } from "react-native-elements";

const logo = require("../../assets/icons/freebites/FreeBitesLogoSmall.png");

export const InfoPopUp = (props) => {
  const dataPerishable = [
    {
      id: 1,
      name: "Perishable: ",
      description: "spoils quickly (cooked/fresh)",
    },
    { id: 2, name: "Non-perishable: ", description: "lasts long (preserved)" },
  ];

  const dataDietary = [
    { id: 1, name: "Vegan: ", description: "No animal products or meat" },
    { id: 2, name: "Vegetarian: ", description: "Meatless" },
    { id: 3, name: "Kosher: ", description: "Jewish dietary standard" },
    { id: 4, name: "Halal: ", description: "Islamic dietary standard" },
  ];

  const ListItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.foodTypeName}>{item.name}</Text>
      <Text style={styles.foodTypeDescription}>{item.description}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={logo} />
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.infoTitle}>
            List of Food Types & Dietary Restrictions
          </Text>
        </View>
        <Divider orientation="horizontal" style={styles.divider} />
        <View style={styles.foodContainer}>
          <Text style={styles.dietTitle}>Food Types:</Text>
          <FlatList
            data={dataPerishable}
            renderItem={({ item }) => <ListItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
          <Text style={styles.dietTitle}>Dietary Restrictions:</Text>
          <FlatList
            data={dataDietary}
            renderItem={({ item }) => <ListItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.setModalVisible()}
      >
        <Text style={styles.buttonText}>I got it!</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingBottom: 5,
    gap: 5,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 5,
  },
  infoContainer: {
    backgroundColor: "white",
    width: "100%",
    paddingBottom: 20,
    borderRadius: 20,
  },
  infoTitle: {
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    height: 40,
    backgroundColor: "orange",
    marginTop: 20,
    borderRadius: 40,
    marginBottom: 30,
    justifyContent: "center",
  },
  divider: {
    width: "100%",
    backgroundColor: "#F3F0F4",
    color: "#F3F0F4",
  },
  foodTypeItem: {
    flexDirection: "row",
  },
  foodTypeName: {
    fontWeight: "600",
    color: "black",
    fontSize: 12,
  },
  foodTypeDescription: {
    marginTop: 2,
    fontSize: 10,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  dietTitle: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 3,
    marginTop: 10,
  },
  foodContainer: {
    paddingLeft: 20,
    paddingTop: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
  },
});
export default InfoPopUp;
