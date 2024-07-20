import { Stack, router } from "expo-router";
import { PostProvider } from "../../../context/postContext";
import { Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BackButton from "../../../components/common/BackButton";
import ProgressBar from "../../../components/post/ProgressBar";
import FreeBitesModal from "../../../components/home/FreeBitesModal";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import React, { useState } from "react";

// don't really know why it's called profile, it's just post (breaks when i rename it)
interface openOptionsProps {
  modalVisible: boolean;
  setModalVisible: () => void;
}

const OpenOptions = (props: openOptionsProps) => {
  return (
    <Pressable
      style={{ marginRight: "8.7%" }}
      // onPress={() => router.push("./modal")}
      onPress={() => props.setModalVisible()}
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
        buttonIcon1={<EvilIcons name="trash" size={30} color="gray" />}
        buttonText2="Draft"
        buttonIcon2={<Ionicons name="archive-outline" size={22} color="gray" />}
        onPress1={() => {
          router.navigate("/home");
          setModalVisible(false);
        }}
        onPress2={() => {
          console.log("Pressed 2");
        }}
        hasCancelButton={true}
        modalVisible={modalVisible}
        setModalVisible={toggleModal}
      />
    </PostProvider>
  );
}
