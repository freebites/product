import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { EmptyPost, postType, comment } from "../../../types/PostTypes";
import { CommentsModal } from "./CommentsModal";
import { Divider, Icon } from "react-native-elements";
import { getOne } from "@api/posts/read";
import { getDownloadURL, ref } from "firebase/storage";
import { TextInput } from "react-native-gesture-handler";
import update from "@api/posts/update";
import { storage } from "../../../firebase";
import { useAuth } from "@context/auth";
import DisplayComments from "./DisplayComments";
import InfoModal from "./InfoModal";
import Header from "../common/Header";
import UploadComment from "./UploadComment";
import PostDate from "./PostDate";
import DisplayTags from "./DisplayTags";
const placeholderImage = require("../../assets/images/kemal.jpg");
const infoIcon = require("../../assets/icons/freebites/information-circle.png");
const vegetarian = require("../../assets/icons/freebites/vegetarian.png");
const msg = require("../../assets/icons/freebites/msg.png");
const lactose = require("../../assets/icons/freebites/lactose.png");

interface PostCardProps {
  id: string;
}

export const PostCard = (props: PostCardProps) => {
  const { user } = useAuth();
  const [singlePost, setSinglePost] = useState<postType>(EmptyPost);
  const [imageURL, setImageURL] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [commentsVisible, setCommentsVisible] = useState<boolean>(false);

  const [newCommentText, setNewCommentText] = useState<string>("");
  const handleCommentChange = (text: string) => {
    setNewCommentText(text);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getOne(props.id);
        setSinglePost(postData);
        const url = await getDownloadURL(ref(storage, postData.imageURIs[0]));
        setImageURL(url);
      } catch (error) {
        setImageURL(placeholderImage);
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [props.id]);

  const changeCommentsVisible = () => {
    setCommentsVisible(!commentsVisible);
  };

  const changeModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <InfoModal
        modalVisible={modalVisible}
        setModalVisible={changeModalVisible}
      ></InfoModal>

      <Header text="Post Description">
        <Icon type={"entypo"} name={"dots-three-horizontal"} />
      </Header>

      <View style={styles.mainbox}>
        <Image
          style={styles.image}
          source={{
            uri: imageURL === "" ? placeholderImage : imageURL,
          }}
        />
        <View style={styles.titleContainer}>
          {/* <View style={styles.locationContainer}>
							<Text style={styles.location}>{singlePost.title}</Text>
						</View> */}
          <Text style={styles.innerDes}>{singlePost.description}</Text>
          <PostDate postDateTime={singlePost.postTime}></PostDate>
        </View>
        <Divider></Divider>
        <View style={styles.info}>
          <Text style={styles.thread}>Food Types & Diet</Text>
          <TouchableOpacity onPress={() => changeModalVisible()}>
            <Image source={infoIcon} style={styles.infoIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.tags}>
          <DisplayTags tags={singlePost.tags}></DisplayTags>
        </View>
        <Divider></Divider>

        <View>
          <View style={styles.info}>
            <Text style={styles.thread}>Live Thread</Text>
          </View>
          {singlePost.comments.length > 0 ? (
            <TouchableOpacity onPress={() => changeCommentsVisible()}>
              <Text style={styles.numComments}>
                View all {singlePost.comments.length} comments
              </Text>
              {singlePost.comments.slice(0, 2).map((comment) => (
                <View
                  style={styles.comments}
                  key={comment.body + comment.username}
                >
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.username}>{comment.username}</Text>
                  </View>
                  <View
                    style={{ display: "flex", paddingLeft: 15, paddingTop: 2 }}
                  >
                    <Text style={styles.commentBody}>{comment.body}</Text>
                  </View>
                </View>
              ))}
            </TouchableOpacity>
          ) : (
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: "#485445",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                No comments yet
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#93A38F",
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                Commenting helps other users know {"\n"}
                more about the status of the food!
              </Text>
            </View>
          )}
        </View>
        <Pressable
          onPress={() => changeCommentsVisible()}
          style={{ marginTop: "auto", marginBottom: "10%" }}
        >
          <UploadComment
            singlePost={singlePost}
            setSinglePost={setSinglePost}
            functionality={false}
          ></UploadComment>
          <CommentsModal
            changeCommentsVisible={changeCommentsVisible}
            singlePost={singlePost}
            setSinglePost={(post: postType) => setSinglePost(post)}
            commentsVisible={commentsVisible}
          ></CommentsModal>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainbox: {
    zIndex: 20,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingBottom: 30,
    paddingTop: 20,
  },
  image: {
    height: 300,
    borderRadius: 15,
  },
  description: {
    display: "flex",
    flex: 2,
    marginVertical: 20,
  },
  location: {
    fontSize: 22,
    marginBottom: 10,
    color: "#1c1c1b",
    fontWeight: "500",
  },
  innerDes: {
    fontSize: 16,
    color: "#58565D",
  },
  info: {
    paddingTop: 15,
    flexDirection: "row",
  },
  infoIcon: {
    width: 10,
    height: 10,
    padding: 10,
    marginTop: 2,
  },
  tags: {
    marginVertical: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  thread: {
    fontSize: 20,
    paddingBottom: 8,
    color: "#1c1c1b",
    fontWeight: "600",
    paddingRight: 15,
  },
  comments: {
    display: "flex",
    flexDirection: "row",
  },
  username: {
    color: "#58565D",
    fontSize: 16,
  },
  commentBody: {
    flex: 1,
  },
  time: {},
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  numComments: {
    paddingBottom: 10,
    color: "#A8A7A6",
    fontSize: 11,
  },
  tagImage: {
    margin: 5,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
export default PostCard;
