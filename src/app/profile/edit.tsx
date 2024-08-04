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
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
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
import OpenCamera from "../../components/common/Camera";
import MissingImageSvg from "../../components/home/svg/missingImageSVG";
import { AppContext } from "../../context/appContext";
import PronounsSelector from "../../components/profile/PronounsSelector";
import { pronounsOptions } from "../../utils";

const editProfile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserType>(EmptyUser);
  const [showCamera, setShowCamera] = useState(false);
  const { profilePicURL, setProfilePicURL } = React.useContext(AppContext);
  const { user } = useAuth();

  enum UserFields {
    userName = "userName",
    firstName = "firstName",
    lastName = "lastName",
    pronouns = "pronouns",
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getOneUser(user.uid);
        setUserData(data);
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

  const handleDataChange = (attribute: UserFields, text: string | string[]) => {
    setUserData((prevData) => ({
      ...prevData,
      [attribute]: text,
    }));
  };

  const validateRequired = (text: string | string[]) => {
    return !text || text.length === 0 ? "This field is required" : null;
  };

  validateRoutePerms();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["35%"], []);
  const handleImagePress = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleSubmit = async () => {
    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.userName ||
      !userData.pronouns
    )
      return;

    try {
      const currentUserData = await getOneUser(user.uid);
      // Update the user data
      const updatedUserData = {
        ...currentUserData,
        ...userData,
      };

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

  if (showCamera) {
    return <OpenCamera profile={true} />;
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        style={[globalStyles.containerLight, { position: "relative" }]}
      >
        <EditProfileHeader onSubmit={handleSubmit} />
        <TouchableWithoutFeedback
          style={{ backgroundColor: "red" }}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, marginBottom: 20 }}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.formContainer}>
                <View style={styles.imageContainer}>
                  <BottomSheetModal
                    backdropComponent={renderBackdrop}
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                  >
                    <BottomSheetView>
                      <EditModal setShowCamera={setShowCamera} />
                    </BottomSheetView>
                  </BottomSheetModal>
                  {loading ? (
                    <View
                      style={{
                        ...styles.profileImage,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ActivityIndicator size="large" color="#F19D48" />
                    </View>
                  ) : profilePicURL ? (
                    <Image
                      source={{ uri: profilePicURL }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <View
                      style={{
                        ...styles.profileImage,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MissingImageSvg />
                    </View>
                  )}
                  <Text
                    style={styles.changePhotoText}
                    onPress={handleImagePress}
                  >
                    Change profile photo
                  </Text>
                </View>
                <View style={styles.form}>
                  <EditProfileInput
                    title="First Name"
                    value={userData?.firstName}
                    onChangeText={(text) =>
                      handleDataChange(UserFields.firstName, text)
                    }
                    validate={validateRequired}
                  />
                  <EditProfileInput
                    title="Last Name"
                    value={userData?.lastName}
                    onChangeText={(text) =>
                      handleDataChange(UserFields.lastName, text)
                    }
                    validate={validateRequired}
                  />
                  <EditProfileInput
                    title="Username"
                    value={userData?.userName}
                    onChangeText={(text) =>
                      handleDataChange(UserFields.userName, text)
                    }
                    validate={validateRequired}
                  />
                  <PronounsSelector
                    value={userData?.pronouns}
                    onChange={(text) =>
                      handleDataChange(UserFields.pronouns, text)
                    }
                    validate={validateRequired}
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
    width: "100%",
    maxHeight: "60%",
    marginBottom: "3%",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
  formContainer: {
    marginTop: 20,
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
    width: "90%",
    justifyContent: "flex-start",
  },
});

export default editProfile;
