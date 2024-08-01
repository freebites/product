export type UserType = {
  uid: string; // firebase UID. we use this instead of the mongoDB _id
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  password: string;
  profile: string;
  bio: string;
  pronouns: string[];
  expoToken: string;
};

export const EmptyUser: UserType = {
  uid: "",
  firstName: "",
  lastName: "",
  emailAddress: "",
  userName: "",
  password: "",
  profile: "",
  bio: "",
  pronouns: [],
  expoToken: "",
};


