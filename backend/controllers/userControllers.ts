import { Request, Response } from "express";

/*
 * Controllers for User Database. These implement the functions that are
 * called for each route in the user database.
 *
 * authors: @vle04 @LordofMankid
 */
import User from "../models/userModel";
import { UserType } from "freebites-types";

/**
 * @description Get all user from the database.
 * @route GET /api/Users
 */
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * @description Get a user from the database.
 * @route GET /api/Users/:id
 * @param { string } uid - The firebase UID (not the mongoDB _id).
 */
const getOneUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ uid: userId });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "fetch incorrectly" });
  }
};

const getOneUserEmail = async (req: Request, res: Response) => {
  const userEmail = req.params.email;
  try {
    const user = await User.findOne({ emailAddress: userEmail });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "fetch incorrectly" });
  }
};

// api/freeites?filter1:hihih;filter2:hihi

interface CreateUserRequest extends Request {
  body: {
    uid: string;
  };
}

/**
 * @description Get a user from the database.
 * @route GET /api/Users/
 * @param { Object } - the user to create in the database.
 */
const createUser = async (req: CreateUserRequest, res: Response) => {
  const user = req.body; // same as the posts schema

  try {
    const savedUser = await User.create(user);
    res.json(savedUser);
  } catch (error) {
    console.log("creating review document", error);
  }
};

interface UpdateUserRequest extends Request {
  body: UserType;
}
/**
 * @description Edit user information in mongoDB database.
 * @route GET /api/Users/:id
 * @param { string } uid - the user's firebase uid
 * @notes - TODO: update relevant info (email change, etc) in Firebase here
 */
const updateUser = async (req: UpdateUserRequest, res: Response) => {
  try {
    const UserId = req.params.id;
    const updatedData = req.body;

    // Find the item by firebase UID and update its properties
    const updatedUser = await User.findOneAndUpdate(
      { uid: UserId },
      updatedData,
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating item IN BACKEND:", error);
    res.status(500).send("Internal Server Error");
  }
};

/**
 * @description delete user from mongoDB
 * @route GET /api/Users/
 * @param { string } uid - the object to delete
 * @notes - TODO: delete account in Firebase here
 */
const deleteUser = async (req: Request, res: Response) => {
  try {
    const UserId = req.params.id;

    // Find the item by firebase UID and remove it
    const deletedUser = await User.findOneAndDelete({ uid: UserId });

    if (!deletedUser) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send("Internal Server Error");
  }
};

export {
  getAllUsers,
  getOneUser,
  getOneUserEmail,
  createUser,
  updateUser,
  deleteUser,
};
