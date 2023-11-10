import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableHighlight } from "react-native"; // views are divs and text a p tags
import { globalStyles } from "../../components/global";
import SearchBar from "../../components/common/SearchBar";
import Database from "../../components/fetchData";
import readData from "../../components/read";

const Home = () => {
	const [favoriteSelected, setFavoriteSelected] = useState(true);
	console.log(readData("653c039a3a6e6c2cf7a59948"));
	// useEffect(() => {
	// 	const fetchData = () => {
	// 	  readData("653c039a3a6e6c2cf7a59948")
	// 	    .then((item) => {
	// 	      console.log('Item data:', item);
	    
	// 	      // Store the result in a variable if needed
	// 	      const myVariable = item;
	// 	      // Now you can use `myVariable` in the rest of your component's logic
	// 	    })
	// 	    .catch((error) => {
	// 	      console.error('Error:', error.message);
	// 	    });
	// 	};
	    
	// 	fetchData();
	//       }, ["653c039a3a6e6c2cf7a59948"]);
	// data[] = Database();
	
	// console.log(myVariable)
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
