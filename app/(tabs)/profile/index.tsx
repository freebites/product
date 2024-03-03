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

const editbutton = require("../../../assets/icons/editbutton.png");

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
    <SafeAreaView style={globalStyles.container}>
      {/* <Text style={[globalStyles.headerText, { marginTop: "8.7%" }]}>
        My Profile
      </Text> */}
      <Header text="My Profile"></Header>

      <View>
        <ProfileCard
          name={currUser.firstName}
          email={currUser.emailAddress}
          bio={currUser.bio}
        />

        {/* <Link href={{ pathname: `/profile/edit` }}>
          <Pressable
            style={{
              height: 10,
              width: 10,
              alignSelf: "flex-end",
              flex: 1,
              paddingTop: 140,
              paddingRight: 20,
              position: "absolute",
            }}
          >
            <Image source={editbutton}></Image>
          </Pressable>
        </Link> */}
      </View>
      {/* Push user.uid params for all children, also in layout to profile!!!*/}
      <Link asChild href={{ pathname: `/profile/history` }}>
        <PlainButton section="top" width="87%" height={60} text="History" />
      </Link>

      <Link href={{ pathname: `/profile/drafts` }} asChild>
        <PlainButton section="middle" width="87%" height={60} text="Drafts" />
      </Link>

      <Link href={{ pathname: `/profile/settings` }} asChild>
        <PlainButton section="middle" width="87%" height={60} text="Settings" />
      </Link>

      <Link href="/profile/FAQ" asChild>
        <PlainButton section="bottom" width="87%" height={60} text="FAQ" />
      </Link>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default Profile;
