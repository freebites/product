import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { Link } from "expo-router";
import { PostContext } from "../../../context/postContext";
import { EmptyPost, postType } from "../../../../types/PostTypes";
import ImageViewer from "../../../components/common/ImageViewer";
import { storage } from "../../../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import create from "../../../../api/posts/create";
import NextButtonText from "../../../components/post/NextButtonText";
import { postStyles } from "./styles/postStyles";
import { COLORS } from "../../../constants";
import { useAuth } from "../../../context/auth";

const placeholder = require("../../../assets/images/kemal.jpg");

export default function reviewpost() {
  const { user } = useAuth();
  const { progress, updateProgress, postData, updatePostData, resetContext } =
    useContext(PostContext);
  // function to upload one picture given a local URI
  const uploadPicture = async (uri: string) => {
    //setUploading(true);

    try {
      // grab the picture from the URI, convert to blob
      const response: any = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(
        storage,
        "post/" + uri.substring(uri.lastIndexOf("/") + 1)
      );

      // upload to the server, returns a Promise string
      return uploadBytes(storageRef, blob).then(async (snapshot) => {
        //console.log("uploaded a blob");
        return await snapshot.ref.fullPath; // store firebase path NOT URL
        // need two returns cuz async
      });
    } catch (error) {
      console.log("fail", error);
    }
  };

  // function to upload all images
  const uploadAllImages = async (uris: string[]) => {
    try {
      const imagePaths = await Promise.all(
        uris.map((uri) => uploadPicture(uri))
      );
      const filteredPaths: string[] = imagePaths.filter(
        (path) => path !== undefined
      ) as string[];
      postData.postTime = new Date();
      postData.postedBy = user.uid;
      create({ user: user, post: { ...postData, imageURIs: filteredPaths } }); // upload to mongoDB!r
      updatePostData(EmptyPost); // clear local post data
      resetContext(); // reset all options to default

      // Other code...
    } catch (error) {
      console.error("Error during image upload:", error);
      // Handle errors as needed
    }
  };

  return (
    <SafeAreaView style={postStyles.container}>
      <KeyboardAvoidingView
        style={{ width: "100%", flex: 1, alignItems: "center" }}
        keyboardVerticalOffset={100}
        behavior={"position"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={postStyles.scrollContainer}
        >
          <View
            style={{
              height: 70,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Image
              style={styles.image}
              source={require("../../../assets/images/posting-freebites-logo-1.png")}
              resizeMode="contain"
            />
          </View>

          <ImageViewer
            placeholderImageSource={placeholder}
            selectedImage={postData.imageURIs}
          />

          <View style={styles.textContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.labels}>
                <Text style={styles.labelText}>Description:</Text>
              </View>
              <View style={styles.values}>
                <Text style={styles.text}>{postData.description}</Text>
              </View>
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.labels}>
                <Text style={styles.labelText}>Location:</Text>
              </View>
              <View style={styles.values}>
                <Text style={styles.text}>hello</Text>
              </View>
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.labels}>
                <Text style={styles.labelText}>Filters:</Text>
              </View>
              <View style={styles.values}>
                {postData.tags.perishable ? (
                  <Tag text="Perishable" />
                ) : (
                  <Tag text="Non-Perishable" />
                )}
                {postData.tags.allergens.map((allergen, index) => (
                  <Tag key={index} text={allergen} />
                ))}
                {postData.tags.diet.map((diet, index) => (
                  <Tag key={index} text={diet} />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Link href="/home" asChild>
        <NextButtonText
          validInput={postData.imageURIs.length != 0}
          onPress={() => uploadAllImages(postData.imageURIs)}
          text={"Post"}
        />
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    width: "100%",
    marginTop: 24,
    marginBottom: "40%",
  },
  rowContainer: {
    width: "100%",
    minHeight: 50,
    gap: 25,
    flexDirection: "row",
  },
  labels: { flex: 1, justifyContent: "flex-start" },
  labelText: {
    textAlign: "right",
    color: "#485445",
    fontSize: 16,
    fontWeight: "500",
  },
  values: { flex: 2, justifyContent: "flex-start", gap: 8 },
  tagContainer: {
    width: 110,
    height: 30,
    backgroundColor: COLORS.neutral[30],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.neutral[70],
  },
  tagText: {
    color: COLORS.neutral[90],
    fontSize: 13,
  },
  text: {
    marginTop: 2,
    color: "#485445",
    fontSize: 14,
  },
  image: {
    width: 31,
    height: 35,
  },
});

const Tag = (props: { text: string }) => {
  return (
    <View style={styles.tagContainer}>
      <Text style={styles.tagText}>{props.text}</Text>
    </View>
  );
};
