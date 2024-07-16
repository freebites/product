import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface MissingContentProps {
    title: string,
    body: string,
}

const MissingContentTemplate = ( props : MissingContentProps) => {
    const {title, body} = props;
    return (
        <View style={styles.textContainer}>
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textBody}>
                {body}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
  textTitle: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#505A4E",
    textShadowRadius: 1,
    textShadowColor: "black",
    paddingBottom: 12,
  },
  textContainer: {
    margin: "5%",
    width: "65%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textBody: {
    textAlign: "center",
    color: "#505A4E",
    opacity: 0.57,
  },
});

export default MissingContentTemplate;
