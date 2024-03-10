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
import React, { useMemo, useRef, useState } from "react";
import { globalStyles } from "../../../components/global";
import EditProfileHeader from "../../../components/profile/EditProfileHeader";
import EditProfileInput from "../../../components/profile/EditProfileInput";
import EditModal from "../../../components/profile/editModal";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
const placeholder = require(" ../../../assets/icons/freebites/placeholder.png");

const editProfile = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const [isEditingPic, setIsEditingPic] = useState(false);

  const handleImagePress = () => {
    bottomSheetModalRef.current?.present();
    setIsEditingPic(true);
  };
  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        style={[
          globalStyles.containerLight,
          { backgroundColor: isEditingPic ? "rgba(0, 0, 0, 0.5)" : "None" },
        ]}
      >
        <EditProfileHeader />
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          accessible={false}
        >
          <KeyboardAvoidingView behavior="position" style={{ marginTop: 22 }}>
            <View
              style={{
                alignItems: "center",
                width: 400,
                backgroundColor: "#f0e1d2",
                borderBottomRightRadius: 30,
                borderBottomLeftRadius: 30,
                paddingTop: 30,
              }}
            >
              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
              >
                <BottomSheetView style={styles.contentContainer}>
                  <Text>Awesome 🎉</Text>
                </BottomSheetView>
              </BottomSheetModal>

              <Image
                source={placeholder}
                style={{ height: 161, width: 143, borderRadius: 10 }}
              />
              <Text
                style={{ marginTop: 15, color: "#F95D25" }}
                onPress={handleImagePress}
              >
                change profile photo
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                margin: "5%",
                marginVertical: "20%",
                marginBottom: 30,
                gap: 30,
              }}
            >
              <EditProfileInput title="Name" />
              <EditProfileInput title="Username" />
              <EditProfileInput title="Pronouns" />
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
