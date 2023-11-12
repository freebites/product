import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableHighlight } from "react-native"; // views are divs and text a p tags
import { globalStyles } from "../../components/global";
import SearchBar from "../../components/common/SearchBar";
import Database from "../../components/fetchData";
import { getAllPosts } from "../../components/read";
import { getOne } from "../../components/read";
import create from "../../components/create";
import postType from "../../context/postContext";

const Home = () => {
	const [favoriteSelected, setFavoriteSelected] = useState(true);
	// console.log(readData("653c039a3a6e6c2cf7a59948"));
	
	const test: postType = {	
		title: "hi",
	description: "testDescription",
	imageURIs: [""],
	tags: {
		perishable: true,
		allergens: [],
		diet: [],
	},
	location: "unknown",
	// comments: [],
	post_id: "",
	room: "",
	postTime: undefined
};
	

// temp useState and useEffect just for testing
const [posts, setPosts] = useState();
useEffect(() => {
	// async function
	const fetchData = async () => {
		const postData = await getAllPosts();
		setPosts(postData);
		console.log(postData);
	};

	fetchData();
	create(test);
}, []); // the empty array in useEffect means 'only run once'

// console.log(posts);

// const getOneThing = async = () => {
// 	const singlePost = await getOne("653c039a3a6e6c2cf7a59948");
// }






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
