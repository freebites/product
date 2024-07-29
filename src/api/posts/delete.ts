import axios from "axios";
import { storage } from "../../../firebase";
import { ref, deleteObject } from "firebase/storage";
const apiURL = process.env.EXPO_PUBLIC_MONGO_ENDPOINT;
const deleteOne = async (itemID: string) => {
  try {
    // find and delete all associated images in firebase database
    await axios
      .get(`${apiURL}/api/Posts/${itemID}`)
      .then(async function (response) {
        // could use forEach, but deletes all images concurrently
        await Promise.all(
          response.data.imageURIs.map(async (imagePath: string) => {
            const deleteRef = ref(storage, imagePath);

            deleteObject(deleteRef)
              .then(() => {
                // file deletes successfully, debug or handle
                // any other code here
              })
              .catch((error) => {
                console.log("Error deleting firebase image: ", error);
              });
          })
        );
      });

    // delete document from mongoDB
    const response = await axios.delete(`${apiURL}/api/Posts/${itemID}`);
  } catch (error) {
    // throw error;
    console.error("Error deleting item IN FRONTEND  :", error);
  }
};

export default deleteOne;
