import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AppContext, filterTypes } from "@context/appContext";
import { setItem } from "../../local-storage/asyncStorage";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";

const FilterList = () => {
  const { filters, sort, perishable, setFilters, setSort, setPerishable } =
    useContext(AppContext);

  // Can access modal methods because component is descendant through hook
  const { dismiss } = useBottomSheetModal();
  const handleCloseModal = () => {
    dismiss();
  };

  useEffect(() => {
    let parts: string[] = [];

    // get array of options' keys, iterate over each key (option)
    Object.keys(filters).forEach((option: string) => {
      if (filters[option]) {
        parts.push(filters[option]);
      }
    });

    setFilters(filters);
    updateFilters(filters);
  }, [filters]); // update on change of any filter

  const updateFilters = async (filters: filterTypes) => {
    await setItem("filters", filters);
  };

  useEffect(() => {
    setSort(sort);
  }, [sort]);

  const updateSort = async (newSort: string) => {
    await setItem("sort", newSort);
    setSort(newSort);
  };

  useEffect(() => {
    setPerishable(perishable);
  }, [perishable]);

  const updatePerishable = async (newPerishable: string) => {
    await setItem("perishable", newPerishable);
    setPerishable(newPerishable);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={handleCloseModal}>
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
            if (sort !== "closest") {
              updateSort("closest");
            }
          }}
        >
          <View style={styles.option}>
            <EvilIcons name="location" size={30} color="black" />
            <Text style={styles.optionsText}>Closest to you</Text>
          </View>

          <View style={styles.checkmark}>
            {sort === "closest" ? (
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
            if (sort !== "recent") {
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
            if (perishable !== "perishable") {
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
            {perishable === "perishable" ? (
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
            if (perishable !== "nonperishable") {
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
            {perishable === "nonperishable" ? (
              <Feather name="check" size={24} color="green" />
            ) : (
              <></>
            )}
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
            // update options. setOptions takes in function prev.
            setFilters({
              ...filters,
              vegetarian: filters.vegetarian === "" ? "vegetarian" : "",
            });
          }}
        >
          <View style={styles.option}>
            <FontAwesome5 name="carrot" size={24} color="black" />
            <Text style={styles.optionsText}>Vegetarian</Text>
          </View>

          <View style={styles.checkmark}>
            {filters.vegetarian !== "" ? (
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
            setFilters({
              ...filters,
              vegan: filters.vegan === "" ? "vegan" : "",
            });
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
            setFilters({
              ...filters,
              gluten: filters.gluten === "" ? "gluten" : "",
            });
          }}
        >
          <View style={styles.option}>
            <MaterialIcons name="grain" size={24} color="black" />
            <Text style={styles.optionsText}>Gluten-Free</Text>
          </View>

          <View style={styles.checkmark}>
            {filters.gluten !== "" ? (
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
            setFilters({
              ...filters,
              lactose: filters.lactose === "" ? "lactose" : "",
            });
          }}
        >
          <View style={styles.option}>
            <MaterialCommunityIcons name="cow" size={24} color="black" />
            <Text style={styles.optionsText}>Lactose Intolerant</Text>
          </View>

          <View style={styles.checkmark}>
            {filters.lactose !== "" ? (
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
            setFilters({
              ...filters,
              kosher: filters.kosher === "" ? "kosher" : "",
            });
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
            {filters.kosher !== "" ? (
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
            setFilters({
              ...filters,
              halal: filters.halal === "" ? "halal" : "",
            });
          }}
        >
          <View style={styles.option}>
            <MaterialCommunityIcons name="food-halal" size={24} color="black" />
            <Text style={styles.optionsText}>Halal</Text>
          </View>

          <View style={styles.checkmark}>
            {filters.halal !== "" ? (
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
    height: "100%",
    borderRadius: 20,
    paddingTop: 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 80,
    paddingHorizontal: 24,
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
    paddingLeft: 48,
    alignItems: "center",
  },
  checkmark: {
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
