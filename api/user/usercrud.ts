import axios from "axios";
import { UserType } from "../../context/userContext";
import { useNotifications } from "../../components/notifications/useNotifications";

const apiURL = process.env.EXPO_PUBLIC_MONGO_ENDPOINT;

export const getAllUsers = async (): Promise<UserType[]> => {
  try {
    const response = await axios.get(`${apiURL}:3001/api/Users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOneUser = async (userID): Promise<UserType> => {
  try {
    const response = await axios.get(`${apiURL}:3001/api/Users/${userID}`);
    return response.data;
  } catch (error) {
    console.log("error getting all items:", error);
    throw error;
  }
};

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
    profile: "",
    bio: "",
    pronouns: "",
    expoToken: token.data,
  };

  try {
    const response = await axios.post(`${apiURL}:3001/api/Users`, user);

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
  console.log(user);
  try {
    const response = await axios.put(
      `${apiURL}:3001/api/Users/${userID}`,
      user
    );
    console.log("Item updated successfully:", response.data);
  } catch (error) {
    console.error("Error updating item IN FRONTEND  :", error);
  }
};
