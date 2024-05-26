import React, { createContext, useState } from "react";
import { EmptyPost, TagOptionType, postType } from "../../types/PostTypes";

type PostContextType = {
  postData: postType;
  updatePostData: (newData: Partial<postType>) => void;
  progress: number;
  updateProgress: (newScreen: number) => void;
  tagOptions: TagOptionType;
  updateTagOptions: (newTag: Partial<TagOptionType>) => void;
  resetContext: () => void;
};

export const defaultOptions: TagOptionType = {
  // these should be set to lower case
  diet: ["vegan", "vegetarian", "dairy-free", "halal", "gluten-free"],
  allergies: ["peanut", "tree nut", "dairy", "eggs"],
};
export const PostContext = createContext<PostContextType>({
  postData: EmptyPost,
  updatePostData: () => {},
  progress: 0,
  updateProgress: () => {},
  tagOptions: defaultOptions,
  updateTagOptions: () => {},
  resetContext: () => {},
});

export const PostProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [postData, setPostData] = useState<postType>(EmptyPost);
  const [progress, setProgress] = useState<number>(0);
  const [tagOptions, setTagOptions] = useState<TagOptionType>(defaultOptions);
  // update context states
  const updatePostData = (newData: Partial<postType>) => {
    setPostData({ ...postData, ...newData });
  };

  const updateProgress = (newScreen: number) => {
    setProgress(newScreen);
  };

  const updateTagOptions = (newTag: Partial<TagOptionType>) => {
    setTagOptions({ ...tagOptions, ...newTag });
  };

  const resetContext = () => {
    setPostData(EmptyPost), setProgress(0), setTagOptions(defaultOptions);
  };

  return (
    <PostContext.Provider
      value={{
        postData,
        updatePostData,
        progress,
        updateProgress,
        tagOptions,
        updateTagOptions,
        resetContext,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
