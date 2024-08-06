import axios from "axios";
import { UserType } from "@context/userContext";
const apiURL = process.env.EXPO_PUBLIC_MONGO_ENDPOINT;

interface NotifyUserProps {
  users: UserType[];
  title: string;
  body: string;
}
export const notifyUsers = async (props: NotifyUserProps) => {
  const { users, title, body } = props;
  try {
    const response = await axios.post(`${apiURL}/api/notify`, {
      users,
      title,
      body,
    });
  } catch (error) {
    console.error("Error sending notification");
  }
};
