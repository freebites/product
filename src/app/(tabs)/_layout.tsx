import { Tabs, Redirect, useSegments } from "expo-router";
import { Image, View } from "react-native";

import React from "react";
import { useAuth } from "../../context/auth";
import { AppContextProvider } from "../../context/appContext";
import ProgressBar from "../../components/post/ProgressBar";
import ActiveProfileIcon from "../../components/home/svg/ActiveProfileIcon";
import ProfileIcon from "../../components/home/svg/ProfileIcon";
import ActiveHomeIcon from "../../components/home/svg/ActiveHomeIcon";
import HomeIcon from "../../components/home/svg/HomeIcon";

const homeIcon = require("../../assets/icons/freebites/home-icon.png");
const postIcon = require("../../assets/icons/freebites/add-post.png");
const profIcon = require("../../assets/icons/freebites/profile.png");

export default () => {
  const { user } = useAuth();
  const segments = useSegments();

  const isActive = (route : string) => segments[1] === route;

  if (user === undefined || user === null || user.uid === null) {
    return <Redirect href="/home" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: "10.4%",
          backgroundColor: "#EEE1D5",
          justifyContent: "center",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: () => isActive("home") ? <ActiveHomeIcon /> : <HomeIcon />,
          tabBarShowLabel: false,
        }}
      />

      <Tabs.Screen
        name="post"
        options={{
          headerShown: false,
          tabBarIcon: () => <Image source={postIcon} />,
          tabBarShowLabel: false,
          href: "/post",
          tabBarStyle: {
            display: "none", // disable tab bar when creating post
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: { pathname: `/profile`, params: { id: user.uid } },
          headerShown: false,
          tabBarIcon: () => isActive("profile") ? <ActiveProfileIcon /> : <ProfileIcon />,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
};
