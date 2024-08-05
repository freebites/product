import axios from "axios";
import { postType, tags } from "freebites-types";
import { UserType } from "freebites-types";
import { getAllUsers, getOneUser } from "api/user/usercrud";
import { notifyUsers } from "api/notify/notifyUsers";

const apiURL = process.env.EXPO_PUBLIC_MONGO_ENDPOINT;

interface CreatePostProps {
  user: UserType;
  post: postType;
}
const create = async (props: CreatePostProps) => {
  const { user, post } = props;
  const { _id, ...postData } = post;
  // function to normalize tags. this will make it easier to search/filter
  const normalizeTags = (tags: tags) => {
    return {
      // for now we're just moving it all to lowercase
      perishable: tags.perishable.toLowerCase(),
      allergens: tags.allergens.map((allergen) => allergen.toLowerCase()),
      diet: tags.diet.map((d) => d.toLowerCase()),
    };
  };

  try {
    // notification logic
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

    const normalizedTags = normalizeTags(post.tags); // Normalize tags
    await axios.post(`${apiURL}/api/Posts`, {
      ...postData,
      tags: normalizedTags,
    });
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

export default create;
