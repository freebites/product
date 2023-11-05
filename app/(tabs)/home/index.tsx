import React, { useState, forwardRef } from "react";
import { View, Text, SafeAreaView, TouchableHighlight, StyleSheet } from "react-native"; // views are divs and text a p tags
import { globalStyles } from "../../../components/global";
import SearchBar from "../../../components/common/SearchBar";
import HomePost from "../../../components/common/homePost"
import {Link, router} from "expo-router";

const Home = () => {

	const [favoriteSelected, setFavoriteSelected] = useState(true);
	return (
		<SafeAreaView style={[globalStyles.container]}>
			<SearchBar />
			<Text> Home </Text>

			<View
				style={{
					flexDirection: "row",
					alignItems: "flex-end",
					justifyContent: "space-evenly",
					width: "100%",
					paddingTop: "3%",
				}}
			>
				<View style={{ width: "30%" }}>
					<TouchableHighlight
						style={{
							borderBottomWidth: 1,
							borderColor: favoriteSelected
								? "#EDA76E"
								: "transparent",
							alignItems: "center",
						}}
						underlayColor="transparent"
						onPress={() => setFavoriteSelected(true)}
					>
						<Text> All </Text>
					</TouchableHighlight>
				</View>

				{/* sets a border width that's normally transparent, 
						and then is tied to the 'loginSelected' boolean 
						TODO: figure out how to animate it, might need 
						a different component for this. Also make more 
						readable  */}
				<View style={{ width: "30%" }}>
					<TouchableHighlight
						style={{
							borderBottomWidth: 1,
							borderColor: !favoriteSelected
								? "#EDA76E"
								: "transparent",
							alignItems: "center",
						}}
						underlayColor="transparent"
						onPress={() => setFavoriteSelected(false)}
					>
						<Text> Bookmark </Text>
					</TouchableHighlight>
				</View>
			</View>
			<View style = {styles.postDisplay}> 
				<HomePost onPress = {() => {
					<Link href = "/home/postPopUp"></Link>
				}}>

				</HomePost>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	postDisplay : {
		flex : 1,
		width : 345,
	}
});

export default Home;
