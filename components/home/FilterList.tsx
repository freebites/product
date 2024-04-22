import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const FilterList = () => {
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
            <Pressable style={styles.button}> 
                <EvilIcons name="location" size={30} color="black" />
                <Text style={styles.optionsText}>Closet to you</Text>
            </Pressable>

            <Pressable style={styles.button}> 
                <EvilIcons name="clock" size={30} color="black" />
                <Text style={styles.optionsText}>Most Recent</Text>
            </Pressable>

            <Pressable style={styles.button}> 
                <MaterialCommunityIcons name="food-outline" size={24} color="black" />
                <Text style={styles.optionsText}>Perishables</Text>
            </Pressable>

            <Pressable style={styles.button}> 
                <MaterialCommunityIcons name="food-off-outline" size={24} color="black" />
                <Text style={styles.optionsText}>Non-Perishables</Text>
            </Pressable>
        </View>

        <Text style={styles.subTitle}>Dietary</Text>

        <View style={styles.optionContainer}>
            <Pressable style={styles.button}> 
                <FontAwesome5 name="carrot" size={24} color="black" />
                <Text style={styles.optionsText}>Vegetarian</Text>
            </Pressable>

            <Pressable style={styles.button}> 
                <EvilIcons name="heart" size={30} color="black" />
                <Text style={styles.optionsText}>Vegan</Text>
            </Pressable>
            
            <Pressable style={styles.button}> 
                <MaterialIcons name="grain" size={24} color="black" />
                <Text style={styles.optionsText}>Gluten-Free</Text>
            </Pressable>

            <Pressable style={styles.button}> 
                <MaterialCommunityIcons name="cow" size={24} color="black" />
                <Text style={styles.optionsText}>Lactose Intolerant</Text>
            </Pressable>

            <Pressable style={styles.button}> 
                <MaterialCommunityIcons name="food-kosher" size={24} color="black" />
                <Text style={styles.optionsText}>Kosher</Text>
            </Pressable>

            <Pressable style={styles.button}> 
                <MaterialCommunityIcons name="food-halal" size={24} color="black" />
                <Text style={styles.optionsText}>Halal</Text>
            </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FAEFE4",
        width: "100%",
        height: 810,
        borderRadius: 20,
        paddingTop: 24,
        paddingHorizontal: 33,
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        gap: 55,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    subTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 24,
    },
    optionContainer: {
        marginLeft: 14,
        marginTop: 21,
        gap: 36,
    },
    button: {
        // backgroundColor: "gray",
        flexDirection: "row",
        gap: 24,
        alignItems: "center",
    },
    optionsText: {
        fontSize: 16,
    },
});

export default FilterList