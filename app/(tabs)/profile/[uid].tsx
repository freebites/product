import React from "react";
import { Link, useLocalSearchParams, router } from "expo-router";
import { View, Text, SafeAreaView, Image, Pressable } from "react-native"; // views are divs and text a p tags
import { useAuth } from "../../../context/auth";
import { globalStyles } from "../../../components/global";
import ProfileCard from "../../../components/common/cards/ProfileCard";
import PlainButton from "../../../components/common/PlainButton";


// Profile page is dynamic, but history, drafts, should be as well. May have to
// seperate into deeper folders to enfoorce dynamic routing.
const Profile = () => {
    const {userId} = useLocalSearchParams<{ userId : string }> ();
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
                <Text
                style={[
                    globalStyles.text,
                    {
                    height: 20,
                    fontWeight: "bold",
                    width: "45%",
                    margin: "15%",
                    textAlign: "right",
                    },
                ]}
                >
                Personal details
                </Text>
                <Link href="/profile/edit">
                <Text
                    style={{
                    fontSize: 16,
                    color: "#FA4A0C",
                    height: 20,
                    width: "40%",
                    }}
                >
                    Edit
                    </Text>
                </Link>
            </View>

            <ProfileCard />
            
            <Link href= {`/profile/${userId}/history`} asChild>
                <PlainButton width="87%" height="60px" text="History" />
            </Link>

            <Link href="/(tabs)/profile/drafts" asChild>
                <PlainButton width="87%" height="60px" text="Drafts" />
            </Link>

            <Link href="/(tabs)/profile/settings" asChild>
                <PlainButton width="87%" height="60px" text="Settings" />
            </Link>

            <Link href="/(tabs)/profile/FAQ" asChild>
                <PlainButton width="87%" height="60px" text="FAQ" />
            </Link>
        </SafeAreaView>
  );
};

export default Profile;
