// backend copy of types
/// types for tags
export type tags = {
  perishable: string;
  allergens: string[];
  diet: string[];
};

// types for comments
export type comment = {
  // _id: string;
  username: string;
  body: string;
  timestamp: Date; // may need to be changed to string
};

// types for a post
export type postType = {
  _id: string;
  title: string;
  description: string;
  imageURIs: string[];
  tags: tags;
  location: Location;
  comments: comment[];
  post_id: string;
  room: string;
  postTime: Date;
  postedBy: string;
};

export type Location = {
  place_id: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
};

export type TagOptionType = {
  diet: string[];
  allergies: string[];
};

// default empty post
export const EmptyPost: postType = {
  _id: "",
  title: "",
  description: "",
  imageURIs: [],
  tags: {
    perishable: "",
    allergens: [],
    diet: [],
  },
  location: {
    place_id: "",
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
  },
  comments: [],
  post_id: "",
  room: "",
  postTime: new Date(),
  postedBy: "",
};

type PostContextType = {
  postData: postType;
  updatePostData: (newData: Partial<postType>) => void;
  progress: number;
  updateProgress: (newScreen: number) => void;
};
