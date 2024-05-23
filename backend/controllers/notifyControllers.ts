import { checkReceiptIds, sendPushNotification } from "../server";
import { Request, Response } from "express";

export const notifyUsers = async (req: Request, res: Response) => {
  const { users, title, body } = req.body;

  try {
    const tickets = await sendPushNotification({ users, title, body });
    res.status(200).json({ message: "Notification sent successfully" });

    /*
	  Handle ReceiptIDs 15 to 30 minutes after sending the notification
	*/
    setTimeout(() => {
      checkReceiptIds(tickets, users);
    }, 30 * 60 * 1000);
  } catch (error) {
    res.status(500).json({ message: "Error sending notification" });
  }
};
