/*
 * honestly i don't know what this file is but i'm gonna leave it here
 * it looks like it's the same as the 'getAllPosts' function that i moved into
 * api/posts but i'm not sure didn't want to delete it yet, but probably
 * safe to delete at some point
 */

import { useEffect, useState } from "react";
import { port } from "./server";
import axios from "axios";

const apiURL = process.env.EXPO_PUBLIC_MONGO_ENDPOINT;
const Database = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/Posts/`);
        console.log(
          "Network request to get data was successful",
          response.data
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return data;
};

export default Database;
