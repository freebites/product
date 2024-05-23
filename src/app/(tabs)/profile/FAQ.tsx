import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { globalStyles } from "../../../../components/global";
import Header from "../../../../components/common/Header";
import BorderLine from "../../../../components/settings/BorderLine";
const FAQ = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Header text="FAQ" />
      <View style={{ width: "80%" }}>
        <Text style={styles.titleText}>1. How does this app work?</Text>

        <Text style={styles.smallText}>
          The app works by notifying the Tufts community of available free food
          opportunities on campus in real-time. You can contribute by posting
          information about free food after events.
        </Text>

        <BorderLine />

        <Text style={styles.titleText}>
          2. Can anyone post free food opportunities?
        </Text>

        <Text style={styles.smallText}>
          Yes! Any Tufts students and staff can post information about free food
          from events, meetings, or gatherings. All posts must include
          information about the food and location.
        </Text>
        <BorderLine />

        <Text style={styles.titleText}>
          3. How do I receive alerts for free opportunities?
        </Text>

        <Text style={styles.smallText}>
          You can enable specific push notifications in settings to receive
          alerts about new postings.
        </Text>
        <BorderLine />
        <Text style={styles.titleText}>
          4. How long do posts stay active on the app?
        </Text>

        <Text style={styles.smallText}>
          Each post remains active for 24 hours from the time it was posted to
          keep information current and relevant.
        </Text>
        <BorderLine />
        <Text style={styles.titleText}>
          5. How do I report inaccurate information or issues with a post?{" "}
        </Text>

        <Text style={styles.smallText}>
          You can report any issues with a post through the app's reporting
          feature in settings.
        </Text>
        <BorderLine />
        <Text style={{ marginTop: 20 }}>
          <Text style={[styles.bottomText]}>
            If you have other questions or concerns, please contact us at
          </Text>
          <Text
            style={[styles.bottomText, { fontWeight: "bold", marginLeft: 10 }]}
          >
            {" "}
            FreeBites@gmail.com
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  smallText: {
    paddingLeft: "5%",
    lineHeight: 14,
    fontSize: 12,
    marginBottom: 15,
    color: "#000000B2",
  },
  titleText: {
    lineHeight: 18,
    marginBottom: 15,
    fontSize: 15,
    marginTop: 10,
  },
  bottomText: {
    fontSize: 14,
    lineHeight: 17,
    color: "#6D756B",
  },
});

export default FAQ;
