import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import { router } from "expo-router";
import { Image } from "react-native-elements";
import { useAuth } from "@context/auth";
import { getOneUser } from "@api/user/usercrud";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../../firebase";
import MissingImageSvg from "../../../components/home/svg/missingImageSVG";
import { AppContext } from "../../../context/appContext";

const editbutton = require("../../../assets/icons/editbutton.png");

interface ProfileCardProps {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
}
const ProfileCard = (props: ProfileCardProps) => {
  const { firstName, lastName, email, bio } = props;
  const { user } = useAuth();
  const { profilePicURL, setProfilePicURL } = React.useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getOneUser(user.uid);
        if (data.profile) {
          const url = await getDownloadURL(
            ref(storage, "profilePictures/" + data.profile)
          );
          setProfilePicURL(url);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <View style={{ marginBottom: 15 }}>
      {loading ? (
        <View
          style={{
            ...styles.picture,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#F19D48" />
        </View>
      ) : profilePicURL ? (
        <Image source={{ uri: profilePicURL }} style={styles.picture} />
      ) : (
        <View
          style={{
            ...styles.picture,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MissingImageSvg />
        </View>
      )}

      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.nameText}>{firstName + lastName}</Text>
          <Text> </Text>

          <Pressable
            onPress={() => {
              router.push({
                pathname: "/profile/edit",
                params: { id: user.uid },
              });
            }}
          >
            <Image style={styles.editButton} source={editbutton}></Image>
          </Pressable>
        </View>
        <Text style={styles.emailText}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  picture: {
    height: 161,
    width: 143,
    borderRadius: 10,
    marginBottom: 10,
  },
  nameText: {
    color: "#58565D",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 5,
  },
  emailText: {
    color: "#58565D",
    fontSize: 14,
    alignSelf: "center",
  },
  editButton: {
    width: 30,
    height: 30,
  },
});
export default ProfileCard;
