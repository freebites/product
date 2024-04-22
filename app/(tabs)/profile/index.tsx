import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import { View, SafeAreaView } from "react-native";
import { globalStyles } from "../../../components/global";
import ProfileCard from "../../../components/common/cards/ProfileCard";
import PlainButton from "../../../components/common/PlainButton";
import { useAuth } from "../../../context/auth";
import { getOneUser } from "../../../api/user/usercrud";
import { EmptyUser } from "../../../context/userContext";

import Header from "../../../components/common/Header";

const Profile = () => {
  const { user } = useAuth();
  const [currUser, setCurrUser] = useState(EmptyUser);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getOneUser(user.uid);
      setCurrUser(userData);
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header text="My Profile"></Header>

      <View>
        <ProfileCard
          name={currUser.firstName}
          email={currUser.emailAddress}
          bio={currUser.bio}
        />
      </View>

      <Link
        asChild
        href={{ pathname: `/profile/history`, params: { id: user.uid } }}
      >
        <PlainButton section="top" width="87%" height={60} text="History" />
      </Link>

      <Link
        href={{ pathname: `/profile/drafts`, params: { id: user.uid } }}
        asChild
      >
        <PlainButton section="middle" width="87%" height={60} text="Drafts" />
      </Link>

      <Link
        href={{ pathname: `/profile/settings`, params: { id: user.uid } }}
        asChild
      >
        <PlainButton section="middle" width="87%" height={60} text="Settings" />
      </Link>

      <Link href="/profile/FAQ" asChild>
        <PlainButton section="bottom" width="87%" height={60} text="FAQ" />
      </Link>
    </SafeAreaView>
  );
};

export default Profile;
