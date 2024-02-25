import React, { useState, useEffect } from "react";
import { Pressable } from "react-native";
import {
  Link,
  Redirect,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native"; // views are divs and text a p tags
import { globalStyles } from "../../../components/global";
import ProfileCard from "../../../components/common/cards/ProfileCard";
import PlainButton from "../../../components/common/PlainButton";
import { useAuth, validateRoutePerms } from "../../../context/auth";
import { getOne } from "../../../api/user/usercrud";
import { emptyUser, userType } from "../../../context/userContext";
import ButtonMenu from "../../../components/common/ButtonMenu";

const editbutton = require("../../../assets/icons/editbutton.png");

const Profile = () => {
  const { user } = useAuth();
  const routeParams = useLocalSearchParams();

  validateRoutePerms(user, routeParams);

  if (user == undefined || user.uid != routeParams.id) {
    return <Redirect href="/login" />;
  }

  const [currUser, setCurrUser] = useState(emptyUser);
  const fetchData = async () => {
    const userData = await getOne(user.uid);
    setCurrUser(userData);
  };

  /*
		TODO (Johnny and Jack): useEffect should change based on screen or 
		on editing screen. Variable to tell us when switching screens
			- make dummy user data in Mongo
			- Inner profile pages need validate check if globalparams is
			accessible in nested pages, 
				router.push params
	*/

  useEffect(() => {
    fetchData();
  }, []);

  console.log(currUser);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={[globalStyles.headerText, { marginTop: "8.7%" }]}>
        My Profile
      </Text>

      <View
        style={{
          height: "7%",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Link href="/profile/edit"></Link>
      </View>
      <View>
        <ProfileCard
          name={currUser.firstName}
          email={currUser.emailAddress}
          bio={currUser.bio}
        />
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
          <Link href={{ pathname: `/profile/edit` }}>
            <Image source={editbutton}></Image>{" "}
          </Link>
        </Pressable>
      </View>
      <Link
        href={{ pathname: `/profile/history`, params: { id: user.uid } }}
        asChild
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
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabMenu: {},
});
export default Profile;
