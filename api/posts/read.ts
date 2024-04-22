import axios from "axios";

const apiURL = process.env.EXPO_PUBLIC_MONGO_ENDPOINT;

export const getAllPosts = async () => {
	try {
		const response = await axios.get(`${apiURL}:3001/api/Posts`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getOne = async (itemID) => {
	try {
		const response = await axios.get(`${apiURL}:3001/api/Posts/${itemID}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
