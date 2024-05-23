import { StyleSheet, Text } from "react-native";
import React from "react";

export const PostDate = (props) => {
  const getTimeDifference = () => {
    const now = new Date();
    const postTime = new Date(props.postDateTime);

    const timeSincePost = Math.abs(now.getTime() - postTime.getTime());
    if (isNaN(timeSincePost)) {
      return "Invalid date";
    }
    const seconds = Math.floor(timeSincePost / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return days
      ? `${days} day${days === 1 ? "" : "s"} ago`
      : hours
      ? `${hours} hour${hours === 1 ? "" : "s"} ago`
      : minutes
      ? `${minutes} min${minutes === 1 ? "" : "s"} ago`
      : `${seconds} sec${seconds === 1 ? "" : "s"} ago`;
  };

  return <Text style={styles.postDate}>{getTimeDifference()}</Text>;
};
const styles = StyleSheet.create({
  postDate: {
    fontSize: 14,
    color: "#668",
  },
});
export default PostDate;
