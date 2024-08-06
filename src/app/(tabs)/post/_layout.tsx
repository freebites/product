import { Stack, router } from "expo-router";
import { PostProvider } from "@context/postContext";
import { Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BackButton from "@components/common/BackButton";
import FreeBitesModal from "@components/home/FreeBitesModal";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

interface openOptionsProps {
  modalVisible: boolean;
  setModalVisible: () => void;
}

const OpenOptions = (props: openOptionsProps) => {
  const { modalVisible, setModalVisible } = props;
  return (
    <Pressable
      style={{ marginRight: "8.7%" }}
      onPress={() => setModalVisible()}
    >
      <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
    </Pressable>
  );
};
export default function ProfileLayout() {
  // includes the postProvider to use the PostContext
  // OKAY SO UPDATE FOR THE FUTURE:
  // IT IS POSSIBLE TO BUILD THE PROGRESS BAR INTO THE HEADER, BUT WE WOULD
  // NEED TO BUILD THE HEADER COMPLETELY FROM SCRATCH. DON'T HAVE TIME FOR
  // THAT RIGHT NOW BUT USE header: () => <HeaderComponent>

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <PostProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerLeft: () => <BackButton marginLeft={"8.7%"} />,
          headerStyle: { backgroundColor: "#FFFCFA" },
          // import the options component here
          headerRight: () => (
            <OpenOptions
              modalVisible={modalVisible}
              setModalVisible={toggleModal}
            />
          ),
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <FreeBitesModal
        headText="Would you like to draft or trash this post? If trashed, your post will be discarded."
        headMargin={false}
        buttonText1="Trash"
        buttonIcon1={<Ionicons name="trash" size={22} color="gray" />}
        buttonText2="Draft"
        buttonIcon2={<Ionicons name="archive-outline" size={22} color="gray" />}
        onPress1={() => {
          router.navigate("/home");
          setModalVisible(false);
        }}
        onPress2={() => {
          // Save and route to drafts
        }}
        hasCancelButton={true}
        modalVisible={modalVisible}
        setModalVisible={toggleModal}
        onModalHide={() => null}
      />
    </PostProvider>
  );
}
