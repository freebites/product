import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableHighlight } from "react-native"; // views are divs and text a p tags
import { globalStyles } from "../../components/global";
import SearchBar from "../../components/common/SearchBar";
import Database from "../../components/fetchData";
import { getAllPosts, getOne } from "../../components/read";
import create from "../../components/create";
import update from "../../components/update";
import deleteOne from "../../components/delete";
import postType from "../../context/postContext";

const Home = () => {
	const [favoriteSelected, setFavoriteSelected] = useState(true);

	return (
		<SafeAreaView style={[globalStyles.container]}>
			{/* <View>
			{data.map((item) => (
				<View key={item._id}>
				<Text>Title: {item.title}</Text>
				<Text>Description: {item.description}</Text>
				</View>
			))} 


			</View> */}

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
						<Text>Login</Text>
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
						<Text>Sign Up</Text>
					</TouchableHighlight>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Home;
