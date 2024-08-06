import React from "react";
import { Text, View, StyleSheet, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../../firebase";
import { deleteObject, ref } from "firebase/storage";
import { getOneUser, updateUser } from "@api/user/usercrud";
import { useAuth } from "@context/auth";
import { uploadPicture } from "./UploadPicture";
import { AppContext } from "@context/appContext";

const placeholder = require(" ../../../assets/icons/freebites/placeholder.png");
const choosephoto = require(" ../../../assets/icons/choosephoto.png");
const camera = require(" ../../../assets/icons/camera.png");
const trash = require(" ../../../assets/icons/trash.png");

interface EditModalProps {
  setShowCamera: (show: boolean) => void;
}

const EditModal = ({ setShowCamera }: EditModalProps) => {
  const { user } = useAuth();
  const { setProfilePicURL } = React.useContext(AppContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 0.2,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      const url = await uploadPicture(result.assets[0].uri, user.uid);
      setProfilePicURL(url);
    }
  };

  const deleteProfilePicture = async () => {
    try {
      const userData = await getOneUser(user.uid);
      if (userData.profile) {
        const fileRef = ref(
          storage,
          "profilePictures/" +
            userData.profile.substring(userData.profile.lastIndexOf("/") + 1)
        );
        await deleteObject(fileRef);
      }

      const updatedUserData = {
        ...userData,
        profile: null,
      };

      await updateUser({ user: updatedUserData, userID: user.uid });
      setProfilePicURL(undefined);
      Alert.alert("Profile picture deleted successfully");
    } catch (error) {
      console.error("Error deleting profile picture:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={placeholder}
        style={{
          width: "40%",
          height: "25%",
          resizeMode: "contain",
          marginBottom: 10,
        }}
      />
      <View
        style={{
          width: "25%",
          height: 4,
          backgroundColor: "#F19D48",
          borderRadius: 5,
          marginBottom: 15,
        }}
      ></View>

      <View style={styles.modalRow}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.modalColumns}>
            <Image source={choosephoto} />
            <Text style={{ color: "#505A4E" }}>Photo Album</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowCamera(true)}>
          <View style={styles.modalColumns}>
            <Image source={camera} />
            <Text style={{ color: "#505A4E" }}>Take a Photo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteProfilePicture}>
          <View style={styles.modalColumns}>
            <Image source={trash} style={{}} />
            <Text style={{ color: "#505A4E" }}>Remove Photo</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  modalColumns: {
    flexDirection: "column",
    alignItems: "center",
  },
  modalRow: {
    marginLeft: 10,
    flexDirection: "row",
    gap: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default EditModal;
