import axios from "axios";
import { useNotifications } from "src/components/notifications/useNotifications";

import { UserType } from "types/UserTypes";
const apiURL = process.env.EXPO_PUBLIC_MONGO_ENDPOINT;

export const getAllUsers = async (): Promise<UserType[]> => {
  try {
    const response = await axios.get(`${apiURL}/api/Users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOneUser = async (userID: string): Promise<UserType> => {
  try {
    const response = await axios.get(`${apiURL}/api/Users/${userID}`);
    return response.data;
  } catch (error) {
    console.log("error getting all items:", error);
    throw error;
  }
};

export const getOneUserEmail = async (emailAddress: string): Promise<UserType> => {
  try {
    const response = await axios.get(`${apiURL}/api/Users/Email/${emailAddress}`);
    return response.data;
  } catch (error) {
    console.log("error getting all items:", error);
    throw error;
  }
 }


interface CreateProps {
  uid: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export const create = async (props: CreateProps) => {
  const { uid, firstName, lastName, emailAddress } = props;
  const token = await useNotifications();
  const user = {
    uid,
    firstName,
    lastName,
    emailAddress,
    userName: "",
    profile: "",
    bio: "",
    pronouns: [],
    expoToken: token?.data,
  };

  try {
    const response = await axios.post(`${apiURL}/api/Users`, user);

    return response;
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

interface UpdateProps {
  user: UserType;
  userID: string;
}

export const updateUser = async (props: UpdateProps) => {
  const { user, userID } = props;
  try {
    await axios.put(`${apiURL}/api/Users/${userID}`, user);
  } catch (error) {
    throw new Error("Error updating item IN FRONTEND  :" + error);
  }
};
