import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

export const getAllPosts = async () => {
	try {
		const response = await axios.get(`${apiURL}:3001/api/Posts`);
		//console.log(response);
		return response.data;
	} catch (error) {
		//console.log("error getting all items:", error);
		throw error;
	}
};

export const getOne = async (itemID) => {
	try {
		const response = await axios.get(`${apiURL}:3001/api/Posts/${itemID}`);
		console.log("getting one");
		return response.data;
	} catch (error) {
		//console.log("error getting all items:", error);
		throw error;
	}
};
