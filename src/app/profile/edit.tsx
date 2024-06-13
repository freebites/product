import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { globalStyles } from "../../components/global";
import EditProfileHeader from "../../components/profile/EditProfileHeader";
import EditProfileInput from "../../components/profile/EditProfileInput";

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import EditModal from "../../components/profile/EditModal";
import { validateRoutePerms } from "../../context/auth";
import { getOneUser, updateUser } from "../../../api/user/usercrud";
import { useAuth } from "../../context/auth";
import { EmptyUser, UserType } from "../../context/userContext";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase";
import post from "components/common/cards/post";

const placeholder = require(" ../../../assets/icons/freebites/placeholder.png");

const editProfile = () => {
  
  const [pronounsOptions] = useState(["She/Her", "He/Him", "They/Them"]);
  const [userData, setUserData] = useState<UserType>(EmptyUser);
  const [profilePicURL, setProfilePicURL] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {

      try {
        const data = await getOneUser(user.uid);
        setUserData(data);
        if (data.profile){
          const url = await getDownloadURL(ref(storage, "profilePictures/" + data.profile));
          setProfilePicURL(url);
        } else setProfilePicURL(placeholder);
      } catch (error) {
        setProfilePicURL(placeholder);
        console.error("Error fetching post:", error);
      }
    };
    fetchUser();
  },[])

  const handleDataChange = (attribute : string, text : string) => {
    setUserData(prevData => ({
      ...prevData,
      [attribute]: text
    }));
  };

  const validateRequired = (text: string) => {
    if (!text) {
      return "This field is required";
    }
    return null;
  };

  const validatePronouns = (text: string) => {
    if (text === "null") {
      return "Pronouns are required";
    }
    return null;
  };

  validateRoutePerms();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["35%"], []);
  const handleImagePress = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleSubmit = async () => {
    const firstNameError = validateRequired(userData?.firstName);
    const lastNameError = validateRequired(userData?.lastName);
    const usernameError = validateRequired(userData?.userName);
    const pronounsError = validatePronouns(userData?.pronouns);

    if (firstNameError || lastNameError || usernameError || pronounsError) {
      console.log("Validation errors:", firstNameError, lastNameError, usernameError, pronounsError);
      return;
    }

    try {
      const currentUserData = await getOneUser(user.uid); 
  
      // Update the user data
      const updatedUserData = {
        ...currentUserData,
        ...userData
      };
      console.log("sdfsdf", updatedUserData);
  
      await updateUser({ user: updatedUserData, userID: user.uid }); 
      Alert.alert("Profile updated successfully");
  
    } catch (error) {
      console.error("Error during user data update:", error);
    }
  };


  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={"close"}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[globalStyles.containerLight, { position: "relative" }]}>
        <EditProfileHeader onSubmit={handleSubmit} />
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
          accessible={false}
        >
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.formContainer}>
                <View style={styles.imageContainer}>
                  <BottomSheetModal
                    backdropComponent={renderBackdrop}
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                  >
                    <BottomSheetView style={styles.contentContainer}>
                      <EditModal />
                    </BottomSheetView>
                  </BottomSheetModal>
                  <Image source={profilePicURL? {uri : profilePicURL} : placeholder} style={styles.profileImage} />
                  <Text style={styles.changePhotoText} onPress={handleImagePress}>
                    Change profile photo
                  </Text>
                </View>
                <View style={styles.form}>
                  <EditProfileInput
                    title="First Name"
                    value={userData?.firstName}
                    onChangeText={(text) => handleDataChange('firstName', text)}
                    validate={validateRequired}
                  />
                  <EditProfileInput
                    title="Last Name"
                    value={userData?.lastName}
                    onChangeText={(text) => handleDataChange('lastName', text)}
                    validate={validateRequired}
                  />
                  <EditProfileInput
                    title="Username"
                    value={userData?.userName}
                    onChangeText={(text) => handleDataChange('userName', text)}
                    validate={validateRequired}
                  />
                  <EditProfileInput
                    title="Pronouns"
                    value={userData?.pronouns}
                    onChangeText={(text) => handleDataChange('pronouns', text)}
                    validate={validatePronouns}
                    options={pronounsOptions}
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    maxHeight: "60%",
    marginBottom: "3%",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    paddingTop: 80,
    alignItems: "center",
    width: "100%",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  profileImage: {
    height: 161,
    width: 143,
    borderRadius: 10,
  },
  changePhotoText: {
    marginTop: 15,
    color: "#F95D25",
    marginBottom: 15,
  },
  inputsContainer: {
    flex: 1,
    width: "80%",
    justifyContent: "flex-start",
  },
});

export default editProfile;