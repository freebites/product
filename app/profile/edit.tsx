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
import ModalBackdrop from "../../components/common/ModalBackdrop";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import EditModal from "../../components/profile/EditModal";

const placeholder = require(" ../../../assets/icons/freebites/placeholder.png");

const editProfile = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["15%", "35%"], []);
  const [isEditingPic, setIsEditingPic] = useState(false);

  const handleImagePress = () => {
    bottomSheetModalRef.current?.present();
    setIsEditingPic(true);
  };
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsEditingPic(false);
    }
  }, []);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={globalStyles.containerLight}>
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
                flexDirection: "column",
              }}
            >
              <BottomSheetModal
                backdropComponent={ModalBackdrop}
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
              >
                <BottomSheetView style={styles.contentContainer}>
                  <EditModal />
                </BottomSheetView>
              </BottomSheetModal>

              <Image
                source={placeholder}
                style={{ height: 161, width: 143, borderRadius: 10 }}
              />
              <Text
                style={{ marginTop: 15, color: "#F95D25", marginBottom: 15 }}
                onPress={handleImagePress}
              >
                change profile photo
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                marginVertical: "20%",
                gap: 50,
                alignItems: "center",
                justifyContent: "center",
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
