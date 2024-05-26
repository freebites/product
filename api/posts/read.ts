import axios from "axios";
import { postType } from "types/PostTypes";
import { port } from "backend/server";
const apiURL = process.env.EXPO_PUBLIC_MONGO_ENDPOINT;

export const getAllPosts = async (): Promise<postType[]> => {
  try {
    const response = await axios.get(`${apiURL}/api/Posts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOne = async (itemID: string): Promise<postType> => {
  try {
    const response = await axios.get(`${apiURL}/api/Posts/${itemID}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// gets with the filter
export const getWithFilter = async (params: {
  diet: string[];
  latitude: string | number;
  longitude: string | number;
  userID: string;
  sort: any;
}) => {
  try {
    // add the params to the URL as needed
    const response = await axios.get(`${apiURL}/api/Posts`, {
      params,
    });

    console.log("getting with params: ", params);
    return response.data;
  } catch (error) {
    console.error("Error retrieving posts:", error);
    throw error;
  }
};
