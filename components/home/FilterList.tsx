import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const FilterList = () => {
	const [vegan, setVegan] = useState("");
	const [vegetarian, setVegetarian] = useState("");
	const [gluten, setGluten] = useState("");
	const [lactose, setLactose] = useState("");
	const [kosher, setKosher] = useState("");
	const [halal, setHalal] = useState("");

	const [filters, setFilters] = useState([]);
	const [setting, setSetting] = useState("closest");

	const adjustFilter = async () => {};
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
						if (setting != "closest") {
							setSetting("closest");
						}
					}}
				>
					<View style={styles.option}>
						<EvilIcons name="location" size={30} color="black" />
						<Text style={styles.optionsText}>Closest to you</Text>
					</View>

					<View style={styles.checkmark}>
						{setting == "closest" ? (
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
						if (setting != "recent") {
							setSetting("recent");
						}
					}}
				>
					<View style={styles.option}>
						<EvilIcons name="clock" size={30} color="black" />
						<Text style={styles.optionsText}>Most Recent</Text>
					</View>

					<View style={styles.checkmark}>
						{setting == "recent" ? (
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
						if (setting != "perish") {
							setSetting("perish");
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
						{setting == "perish" ? (
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
						if (setting != "nonperish") {
							setSetting("nonperish");
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
						{setting == "nonperish" ? (
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
						vegetarian == ""
							? setVegetarian("vegetarian")
							: setVegetarian("");
					}}
				>
					<View style={styles.option}>
						<FontAwesome5 name="carrot" size={24} color="black" />
						<Text style={styles.optionsText}>Vegetarian</Text>
					</View>

					<View style={styles.checkmark}>
						{vegetarian != "" ? (
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
						vegan == "" ? setVegan("vegan") : setVegan("");
					}}
				>
					<View style={styles.option}>
						<EvilIcons name="heart" size={30} color="black" />
						<Text style={styles.optionsText}>Vegan</Text>
					</View>

					<View style={styles.checkmark}>
						{vegan != "" ? (
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
						gluten == "" ? setGluten("gluten") : setGluten("");
					}}
				>
					<View style={styles.option}>
						<MaterialIcons name="grain" size={24} color="black" />
						<Text style={styles.optionsText}>Gluten-Free</Text>
					</View>

					<View style={styles.checkmark}>
						{gluten != "" ? (
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
						lactose == "" ? setLactose("lactose") : setLactose("");
					}}
				>
					<View style={styles.option}>
						<MaterialCommunityIcons
							name="cow"
							size={24}
							color="black"
						/>
						<Text style={styles.optionsText}>
							Lactose Intolerant
						</Text>
					</View>

					<View style={styles.checkmark}>
						{lactose != "" ? (
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
						kosher == "" ? setKosher("kosher") : setKosher("");
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
						{kosher != "" ? (
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
						halal == "" ? setHalal("halal") : setHalal("");
					}}
				>
					<View style={styles.option}>
						<MaterialCommunityIcons
							name="food-halal"
							size={24}
							color="black"
						/>
						<Text style={styles.optionsText}>Halal</Text>
					</View>

					<View style={styles.checkmark}>
						{halal != "" ? (
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
	},
	button: {
		flexDirection: "row",
		gap: 24,
		alignItems: "center",
		height: 50,
		width: "100%",
	},
	optionsText: {
		fontSize: 16,
	},
	option: {
		flexDirection: "row",
		width: 250,
		gap: 24,
		// backgroundColor: "red",
	},
	checkmark: {
		// backgroundColor: "blue",
	},
});

export default FilterList;
