import React, { useState, useEffect } from "react";
import { Pressable } from "react-native";
import {
  Link,
  Redirect,
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native"; // views are divs and text a p tags
import { globalStyles } from "../../../components/global";
import ProfileCard from "../../../components/common/cards/ProfileCard";
import PlainButton from "../../../components/common/PlainButton";
import { useAuth } from "../../../context/auth";
import { getOne } from "../../../api/user/usercrud";
import { emptyUser, userType } from "../../../context/userContext";
import ButtonMenu from "../../../components/common/ButtonMenu";
import Header from "../../../components/common/Header";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const Profile = () => {
  const { user } = useAuth();
  const routeParams = useLocalSearchParams();

  // validateRoutePerms(user, routeParams);
  // React.useEffect(() => {
  //   if (user == undefined || user.uid != routeParams.id) {
  //     router.replace("/login");
  //   }
  // }, [user]);

  const [currUser, setCurrUser] = useState(emptyUser);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getOne(user.uid);
      setCurrUser(userData);
    };
    fetchUser();
  }, []);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={globalStyles.container}>
        <Header text="My Profile"></Header>

        <View>
          <ProfileCard
            name={currUser.firstName}
            email={currUser.emailAddress}
            bio={currUser.bio}
          />
        </View>

        {/* Push user.uid params for all children, also in layout to profile!!!*/}
        <Link asChild href={{ pathname: `/profile/history` }}>
          <PlainButton section="top" width="87%" height={60} text="History" />
        </Link>

        <Link href={{ pathname: `/profile/drafts` }} asChild>
          <PlainButton section="middle" width="87%" height={60} text="Drafts" />
        </Link>

        <Link href={{ pathname: `/profile/settings` }} asChild>
          <PlainButton
            section="middle"
            width="87%"
            height={60}
            text="Settings"
          />
        </Link>

        <Link href="/profile/FAQ" asChild>
          <PlainButton section="bottom" width="87%" height={60} text="FAQ" />
        </Link>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default Profile;
