import axios from "axios";

import { getAllUsers, getOneUser } from "../user/usercrud";
import { notifyUsers } from "../notify/notifyUsers";
import { postType } from "../../context/postContext";
import { UserType } from "../../context/userContext";

const apiURL = process.env.EXPO_PUBLIC_MONGO_ENDPOINT;

interface CreatePostProps {
  user: UserType;
  post: postType;
}

const create = async (props: CreatePostProps) => {
  const { user, post } = props;
  const { _id, ...postData } = post;
  try {
    const allUsers = await getAllUsers();

    const myselfUser = await getOneUser(user.uid);
    const toNotifyUsers = allUsers.filter(
      (eachUser) => eachUser.uid !== myselfUser.uid
    );
    await notifyUsers({
      users: toNotifyUsers,
      title: "New Post! Testing!",
      body: "Check out the new post!",
    });
    await axios.post(`${apiURL}:3001/api/Posts`, postData);

    // Handle the response or any further actions
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

export default create;
