import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import axios from "axios";

const apiURL = process.env.EXPO_PUBLIC_MONGO_ENDPOINT;
const Database = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${apiURL}:3001/api/Posts/`);
				console.log(
					"Network request to get data was successful",
					response.data
				);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return data;
};

export default Database;
