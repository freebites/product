import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AppContext, filterTypes } from "../../context/appContext";
import { setItem } from "../../local-storage/asyncStorage";
import fetchData from "../../app/index";

const FilterList = () => {
  const { filters, sort, perish, setFilters, setSort, setPerishable } =
    useContext(AppContext);

  // just refactor this into an array that's stored in the context haha.
  // eventually we're gonna want to store this asynchronously.
  // const [vegan, setVegan] = useState("");
  // const [vegetarian, setVegetarian] = useState("");
  // const [gluten, setGluten] = useState("");
  // const [lactose, setLactose] = useState("");
  // const [kosher, setKosher] = useState("");
  // const [halal, setHalal] = useState("");

  // const [options, setOptions] = useState({
  //   vegan: "",
  //   vegetarian: "",
  //   gluten: "",
  //   lactose: "",
  //   kosher: "",
  //   halal: "",
  // });

  useEffect(() => {
    let parts = [];

    // get array of options' keys, iterate over each key (option)
    Object.keys(filters).forEach((option: string) => {
      if (filters[option]) {
        parts.push(filters[option]);
      }
    });

    let query = parts.join(" ");
    setFilters(filters);
    updateFilters(filters);
  }, [filters]); // update on change of any filter

  const updateFilters = async (filters: filterTypes) => {
    await setItem("filters", filters);
  };

  /* Sorting needs to be implemented */

  useEffect(() => {
    setSort(sort);
  }, [sort]);

  const updateSort = async (newSort: string) => {
    await setItem("sort", newSort);
    setSort(newSort);
  };

  useEffect(() => {
    setPerishable(perish);
  }, [perish]);

  const updatePerishable = async (newPerish: string) => {
    await setItem("perishable", newPerish);
    setPerishable(newPerish);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable>
          <Entypo name="chevron-thin-left" size={17} color="black" />
        </Pressable>
        <Text style={styles.title}>Sort and Filter</Text>
      </View>

      <Text style={styles.subTitle}>Sort</Text>

      <View style={styles.optionContainer}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : "transparent",
            },
            styles.button,
          ]}
          onPress={() => {
            if (sort != "closest") {
              updateSort("closest");
            }
          }}
        >
          <View style={styles.option}>
            <EvilIcons name="location" size={30} color="black" />
            <Text style={styles.optionsText}>Closest to you</Text>
          </View>

          <View style={styles.checkmark}>
            {sort == "closest" ? (
              <Feather name="check" size={24} color="green" />
            ) : (
              <></>
            )}
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : "transparent",
            },
            styles.button,
          ]}
          onPress={() => {
            if (sort != "recent") {
              updateSort("recent");
            }
          }}
        >
          <View style={styles.option}>
            <EvilIcons name="clock" size={30} color="black" />
            <Text style={styles.optionsText}>Most Recent</Text>
          </View>

          <View style={styles.checkmark}>
            {sort == "recent" ? (
              <Feather name="check" size={24} color="green" />
            ) : (
              <></>
            )}
          </View>
        </Pressable>
        <Text style={styles.subTitle}>Perishable</Text>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : "transparent",
            },
            styles.button,
          ]}
          onPress={() => {
            if (perish != "perishable") {
              updatePerishable("perishable");
            } else {
              updatePerishable("");
            }
          }}
        >
          <View style={styles.option}>
            <MaterialCommunityIcons
              name="food-outline"
              size={24}
              color="black"
            />
            <Text style={styles.optionsText}>Perishables</Text>
          </View>

          <View style={styles.checkmark}>
            {perish == "perishable" ? (
              <Feather name="check" size={24} color="green" />
            ) : (
              <></>
            )}
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : "transparent",
            },
            styles.button,
          ]}
          onPress={() => {
            if (perish != "nonperishable") {
              updatePerishable("nonperishable");
            } else {
              updatePerishable("");
            }
          }}
        >
          <View style={styles.option}>
            <MaterialCommunityIcons
              name="food-off-outline"
              size={24}
              color="black"
            />
            <Text style={styles.optionsText}>Non-Perishables</Text>
          </View>

          <View style={styles.checkmark}>
            {perish == "nonperishable" ? (
              <Feather name="check" size={24} color="green" />
            ) : (
              <></>
            )}
            {/* {filters.nonperish != "" ? (
              <Feather name="check" size={24} color="green" />
            ) : (
              <></>
            )} */}
          </View>
        </Pressable>
      </View>

      <Text style={styles.subTitle}>Dietary</Text>

      <View style={styles.optionContainer}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : "transparent",
            },
            styles.button,
          ]}
          onPress={() => {
            // vegetarian == ""
            // 	? setVegetarian("vegetarian")
            // 	: setVegetarian("");

            // update options. setOptions takes in function prev.
            setFilters((prev) => ({
              ...prev, // spread operator
              // update specific option
              vegetarian:
                prev.vegetarian == ""
                  ? (prev.vegetarian = "vegetarian")
                  : (prev.vegetarian = ""),
            }));
          }}
        >
          <View style={styles.option}>
            <FontAwesome5 name="carrot" size={24} color="black" />
            <Text style={styles.optionsText}>Vegetarian</Text>
          </View>

          <View style={styles.checkmark}>
            {filters.vegetarian != "" ? (
              <Feather name="check" size={24} color="green" />
            ) : (
              <></>
            )}
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : "transparent",
            },
            styles.button,
          ]}
          onPress={() => {
            // vegan == "" ? setVegan("vegan") : setVegan("");
            setFilters((prev) => ({
              ...prev, // spread operator
              // update specific option
              vegan:
                prev.vegan == "" ? (prev.vegan = "vegan") : (prev.vegan = ""),
            }));
          }}
        >
          <View style={styles.option}>
            <EvilIcons name="heart" size={30} color="black" />
            <Text style={styles.optionsText}>Vegan</Text>
          </View>

          <View style={styles.checkmark}>
            {filters.vegan != "" ? (
              <Feather name="check" size={24} color="green" />
            ) : (
              <></>
            )}
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : "transparent",
            },
            styles.button,
          ]}
          onPress={() => {
            // gluten == "" ? setGluten("gluten") : setGluten("");
            setFilters((prev) => ({
              ...prev, // spread operator
              // update specific option
              gluten:
                prev.gluten == ""
                  ? (prev.gluten = "gluten")
                  : (prev.gluten = ""),
            }));
          }}
        >
          <View style={styles.option}>
            <MaterialIcons name="grain" size={24} color="black" />
            <Text style={styles.optionsText}>Gluten-Free</Text>
          </View>

          <View style={styles.checkmark}>
            {filters.gluten != "" ? (
              <Feather name="check" size={24} color="green" />
            ) : (
              <></>
            )}
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : "transparent",
            },
            styles.button,
          ]}
          onPress={() => {
            // lactose == "" ? setLactose("lactose") : setLactose("");
            setFilters((prev) => ({
              ...prev, // spread operator
              // update specific option
              lactose:
                prev.lactose == ""
                  ? (prev.lactose = "lactose")
                  : (prev.lactose = ""),
            }));
          }}
        >
          <View style={styles.option}>
            <MaterialCommunityIcons name="cow" size={24} color="black" />
            <Text style={styles.optionsText}>Lactose Intolerant</Text>
          </View>

          <View style={styles.checkmark}>
            {filters.lactose != "" ? (
              <Feather name="check" size={24} color="green" />
            ) : (
              <></>
            )}
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : "transparent",
            },
            styles.button,
          ]}
          onPress={() => {
            // kosher == "" ? setKosher("kosher") : setKosher("");
            setFilters((prev) => ({
              ...prev, // spread operator
              // update specific option
              kosher:
                prev.kosher == ""
                  ? (prev.kosher = "kosher")
                  : (prev.kosher = ""),
            }));
          }}
        >
          <View style={styles.option}>
            <MaterialCommunityIcons
              name="food-kosher"
              size={24}
              color="black"
            />
            <Text style={styles.optionsText}>Kosher</Text>
          </View>

          <View style={styles.checkmark}>
            {filters.kosher != "" ? (
              <Feather name="check" size={24} color="green" />
            ) : (
              <></>
            )}
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : "transparent",
            },
            styles.button,
          ]}
          onPress={() => {
            // halal == "" ? setHalal("halal") : setHalal("");
            setFilters((prev) => ({
              ...prev, // spread operator
              // update specific option
              halal:
                prev.halal == "" ? (prev.halal = "halal") : (prev.halal = ""),
            }));
          }}
        >
          <View style={styles.option}>
            <MaterialCommunityIcons name="food-halal" size={24} color="black" />
            <Text style={styles.optionsText}>Halal</Text>
          </View>

          <View style={styles.checkmark}>
            {filters.halal != "" ? (
              <Feather name="check" size={24} color="green" />
            ) : (
              <></>
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAEFE4",
    width: "100%",
    height: 810,
    borderRadius: 20,
    paddingTop: 24,
    // paddingHorizontal: 33,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 80,
    paddingHorizontal: 33,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    paddingHorizontal: 33,
  },
  optionContainer: {
    marginTop: 21,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: "100%",
  },
  optionsText: {
    fontSize: 16,
  },
  option: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    flex: 3,
    gap: 24,
    // backgroundColor: "red",
    paddingLeft: 48,
    alignItems: "center",
  },
  checkmark: {
    // backgroundColor: "blue",
    width: "100%",
    height: "100%",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 20,
  },
});

export default FilterList;
