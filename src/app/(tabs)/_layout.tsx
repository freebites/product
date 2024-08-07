import React from "react";
import { useAuth } from "../../context/auth";
import ActiveHomeIcon from "../../assets/icons/home/ActiveHomeIcon";
import HomeIcon from "../../assets/icons/home/HomeIcon";
import ActiveProfileIcon from "../../assets/icons/home/ActiveProfileIcon";
import ProfileIcon from "../../assets/icons/home/ProfileIcon";
import { Tabs, Redirect, useSegments } from "expo-router";
import { Icon } from "react-native-elements";


export default () => {
  const { user } = useAuth();
  const segments = useSegments();

  const isActive = (route: string) => segments[1] === route;

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
          tabBarIcon: () =>
            isActive("home") ? <ActiveHomeIcon /> : <HomeIcon />,
          tabBarShowLabel: false,
        }}
      />

      <Tabs.Screen
        name="post"
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="add-circle" size={50} color="grey" />,
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
          tabBarIcon: () =>
            isActive("profile") ? <ActiveProfileIcon /> : <ProfileIcon />,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
};
