import axios from "axios";
import { postType } from "types/PostTypes";
const apiURL = process.env.EXPO_PUBLIC_MONGO_ENDPOINT;

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
    return response.data;
  } catch (error) {
    console.error("Error retrieving posts:", error);
    throw error;
  }
};

export const getAllPosts = async () =>
  getWithFilter({
    diet: [""],
    latitude: "",
    longitude: "",
    userID: "",
    sort: "",
  });
