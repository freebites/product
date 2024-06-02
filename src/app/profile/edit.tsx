import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
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
import { getAuth } from "firebase/auth";
import { getOneUser, updateUser } from "../../../api/user/usercrud";

const placeholder = require(" ../../../assets/icons/freebites/placeholder.png");

const editProfile = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [pronouns, setPronouns] = useState('');

  validateRoutePerms();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["35%"], []);
  const handleImagePress = () => {
    bottomSheetModalRef.current?.present();
  };
  const handleSubmit = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user){
      console.log("User is not authenticated");
      return;
    }

    const uid = user.uid;
    const currentUserData = getOneUser(uid);

    if (!currentUserData) {
      console.log("Failed to fetch current user data");
      return;
    }
   
    const newUserData = {
      firstName: name,
      pronouns: pronouns,
      profile: username,
    }

    const updatedUserData = { ...currentUserData, ...newUserData};
    updateUser({ user: updatedUserData, userID: uid });

    console.log({ name, username, pronouns });
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
      <SafeAreaView
        style={[globalStyles.containerLight, { position: "relative" }]}
      >
        <EditProfileHeader onSubmit={handleSubmit}/>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
          accessible={false}
        >
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={0}
            style={{ marginTop: 30 }}
          >
            <View
              style={{
                alignItems: "center",
                width: 400,
                backgroundColor: "#f0e1d2",
                borderBottomRightRadius: 30,
                borderBottomLeftRadius: 30,
                paddingTop: 30,
                flexDirection: "column",
                zIndex: 1,
              }}
            >
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

              <Image
                source={placeholder}
                style={{
                  height: 161,
                  width: 143,
                  borderRadius: 10,
                }}
              />
              <Text
                style={{
                  marginTop: 15,
                  color: "#F95D25",
                  marginBottom: 15,
                }}
                onPress={handleImagePress}
              >
                change profile photo
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                gap: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EditProfileInput title="Name" value={name} onChangeText={setName}/>
              <EditProfileInput title="Username" value={username} onChangeText={setUsername}/>
              <EditProfileInput title="Pronouns" value={pronouns} onChangeText={setPronouns}/>
            </View>
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default editProfile;
