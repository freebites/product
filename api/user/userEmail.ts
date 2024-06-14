// import axios from "axios";
// const apiURL = process.env.EXPO_PUBLIC_MONGO_ENDPOINT;

// export const sendPasswordResetEmail = async (emailAddress: string) => {
//   try {
//     console.log("entering send password reset API call")
//     const response = await axios.get(`${apiURL}/api/Users/Reset/${emailAddress}`);
//     return response.data;
//   } catch (error) {
//     console.log("error sending email:", error);
//     throw error;
//   }
// };