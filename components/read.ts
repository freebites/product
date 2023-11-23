import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import axios from "axios";

export const getAllPosts = async () => {
	try {
		const response = await axios.get("http://192.168.1.199:3001/api/Posts");
		//console.log(response);
		return response.data;
	} catch (error) {
		//console.log("error getting all items:", error);
		throw error;
	}
};

export const getOne = async (itemID) => {
	try {
		const response = await axios.get(
			`http://localhost:3001/api/Posts/${itemID}`
		);
		console.log("getting one");
		return response.data;
	} catch (error) {
		//console.log("error getting all items:", error);
		throw error;
	}
};
