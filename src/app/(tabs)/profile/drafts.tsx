import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import MissingContentTemplate from "../../../components/common/MissingContent";
import { globalStyles } from "@components/global";
import Header from "@components/common/Header";

/*
	TODO: 
		- Currently the localParams in this page is the UID
		- For backend, each User should have a [drafts] 
		- Pass [drafts] from profile, display accordingly
*/

const drafts = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Header text="Drafts" />
      <MissingContentTemplate
        title={"No drafts yet"}
        body={"Try making a post by clicking on the + button on the homepage!"}
      />
    </SafeAreaView>
  );
};

export default drafts;
