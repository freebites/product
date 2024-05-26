import accountConnection from "./config/userDatabase";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postRouter from "./routes/postRoutes";
import userRouter from "./routes/userRoutes";
import notifyRouter from "./routes/notifyRoutes";
import type { UserType } from "./types/UserTypes";
import Expo from "expo-server-sdk";
import type { ExpoPushMessage, ExpoPushTicket } from "expo-server-sdk";
import User from "./models/userModel";

const app = express();
export const port = process.env.PORT || 8080;
const expo = new Expo();
console.log("hi");
// Enable CORS to allow requests from React Native app
app.use(cors());
app.use(bodyParser.json());

// project
///   backedn/
/// 	node_modules
/// 	package.json
///   frontend/
///     node_modules
// packaage.json (optional)

// Connect to Posts database (default database)

mongoose
  .connect(
    "mongodb+srv://freebites7:1234@freebites.w7sk83d.mongodb.net/Posts?retryWrites=true&w=majority"
  )
  .catch((err) => {
    console.log("error connecting to db", err);
  });

// // listeners for account connection and errors
// accountConnection.on("connected", () => {
//   console.log("Account database connection successful!");
// });

// accountConnection.on("error", (error: any) => {
//   console.error("Error connecting to account database: ", error);
// });

// use routes from post database
app.use(postRouter);

// use routes from user database
app.use(userRouter);

app.use(notifyRouter);

// Start the server
app.listen(port, () => {
  console.log(
    `Server is running on https://freebites-backend-3tycrwhobq-ue.a.run.app`
  );
});

/*
  Each user has a expoPushToken. Send token to Expo -> Expo sends notifications.
  Check each messages was successfuly sent by looking at expo ticket.
  Also, error check with each message's reciept.
*/
interface SendNotificationProps {
  users: UserType[];
  title: string;
  body: string;
}
export const sendPushNotification = async (props: SendNotificationProps) => {
  const { users, title, body } = props;
  const expoPushToken = users.map((user) => user.expoToken);

  const messages: ExpoPushMessage[] = expoPushToken
    .map((token) => {
      if (!Expo.isExpoPushToken(token)) {
        console.error(`Push token ${token} is not a valid Expo push token`);
        return null;
      }
      return {
        to: token,
        sound: "default",
        title: title,
        body: body,
        data: { someData: "goes here" },
      } as ExpoPushMessage;
    })
    .filter((message): message is ExpoPushMessage => message !== null);

  const chunks = expo.chunkPushNotifications(messages);
  let tickets: ExpoPushTicket[] = [];
  await Promise.all(
    chunks.map(async (chunk) => {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        ticketChunk.forEach((ticket, index) => {
          if (
            ticket.status === "error" &&
            ticket.details?.error === "DeviceNotRegistered"
          ) {
            //Remove expoToken from the user's profile
            const user = users[index];
            const { expoToken, ...other } = user;
            // updateUser({
            //   userID: user.uid,
            //   user: { ...other, expoToken: "" },
            // });

            User.findOneAndUpdate(
              { uid: user.uid },
              { expoToken: "" },
              {
                new: true,
              }
            );
          }
          tickets.push(ticket);
        });
      } catch (error) {
        console.error("Error for Expo Tickets", error);
        return [];
      }
    })
  );
  return tickets;
};

export const checkReceiptIds = async (tickets: any[], users: UserType[]) => {
  const receiptIds = tickets.map((ticket) => {
    if (ticket.id) {
      return ticket.id;
    }
  });
  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  receiptIdChunks.forEach(async (chunk, index) => {
    const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
    for (let receiptId in receipts) {
      const { status, details } = receipts[receiptId];
      if (status === "ok") {
        continue;
      } else if (status === "error" && details) {
        if (details.error === "DeviceNotRegistered") {
          // Remove expoToken from the user's profile
          const user = users[index];
          const { expoToken, ...other } = user;
          User.findOneAndUpdate(
            { uid: user.uid },
            { expoToken: "" },
            {
              new: true,
            }
          );
        }
      } else {
        console.error(`There was an error sending a notification: ${status}`);
      }
    }
  });
};
