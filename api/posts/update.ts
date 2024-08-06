import axios from "axios";
import { postType } from "freebites-types";

const apiURL = process.env.EXPO_PUBLIC_MONGO_ENDPOINT;

interface UpdateProps {
  post: postType;
  itemID: string;
}

const update = async (props: UpdateProps) => {
  const { post, itemID } = props;

  try {
    const response = await axios.put(`${apiURL}/api/Posts/${itemID}`, post);

    return response.data;
  } catch (error) {
    console.error("Error updating item IN FRONTEND  :", error);
  }
};

export default update;
