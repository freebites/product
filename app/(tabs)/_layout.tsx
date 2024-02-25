import {
  Tabs,
  Link,
  Stack,
  usePathname,
  router,
  useRouter,
  Redirect,
} from "expo-router";
import { Image } from "react-native";
import React from "react";
import { useAuth, useProtectedRoute } from "../../context/auth";

const homeIcon = require("../../assets/icons/freebites/home-icon.png");
const postIcon = require("../../assets/icons/freebites/add-post.png");
const profIcon = require("../../assets/icons/freebites/profile.png");

export default () => {
  const { user } = useAuth();
  if (user == undefined || user.uid == null) {
    <Redirect href="/login" />;
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
          tabBarIcon: () => <Image source={homeIcon} />,
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
          href: { pathname: `/profile`, params: { id: "user.uid" } },
          headerShown: false,
          tabBarIcon: () => <Image source={profIcon} />,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
};
