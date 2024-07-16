import React from 'react';
import { View, StyleSheet } from 'react-native';

const HomePostSkeleton = () => {
  return (
    <View style={styles.mainbox}>
      <View style={styles.imagebox}>
        <View style={{ ...styles.skeletonBox, height: 125, width: '100%', marginBottom: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
      </View>

      <View style={styles.topbox}>
        <View style={{ ...styles.skeletonBox, width: 14, height: 14, borderRadius: 7 }} />
        <View style={{ ...styles.skeletonBox, width: '70%', height: 8, borderRadius: 4 }} />
      </View>

      <View style={{ width: "100%", paddingHorizontal: 20, paddingBottom: 15}}>
        <View style={{ ...styles.skeletonBox, height: 15, width: '20%', marginBottom: 8 }} />
        <View style={{ ...styles.skeletonBox, height: 25, width: '25%', marginBottom: 10  }} />
        <View style={{flexDirection : "row", justifyContent: "space-between"}}>
          <View style={{ ...styles.skeletonBox, height: 15, width: '60%', marginBottom: 10  }} />
          <View style={{ ...styles.skeletonBox, height: 20, width: '20%', marginBottom: 10  }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainbox: {
    width: "100%",
    backgroundColor: "white",
    height: 224,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 20,
    flexDirection: "column",
  },
  imagebox: {
    width: "100%",
    height: 125,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  leftbox: {
    width: "65%",
    flexDirection: "column",
    borderBottomLeftRadius: 15,
    paddingLeft: 25,
    paddingVertical: 18,
    gap: 4,
  },
  rightbox: {
    flexDirection: "column",
    width: "35%",
    borderBottomRightRadius: 15,
    paddingHorizontal: 24,
    paddingVertical: 18,
    alignItems: "flex-end",
    gap: 13,
  },
  topbox: {
    width: 69,
    height: 20.874,
    borderRadius: 6.79,
    marginLeft: 17,
    marginVertical: 17,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4.64,
    gap: 2.9,
    position: "absolute",
  },
  skeletonBox: {
    backgroundColor: '#F1EDEA',
  },
});

export default HomePostSkeleton;
