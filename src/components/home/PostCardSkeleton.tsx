import React from 'react';
import { View, StyleSheet } from 'react-native';
import MissingPost from '../../assets/icons/home/MissingPost';

const PostCardSkeleton = () => {
  return (
    <View style={styles.mainbox}>
      <View style={styles.imageSkeleton}>
        <MissingPost />
      </View>
      <View style={{flexDirection : "row", justifyContent: "space-between"}}>
      <View style={{ ...styles.title, width: '40%' }} />
      <View style={{ ...styles.subtitle, width: '20%' }} />
      </View>
      <View style={{ ...styles.subtitle, width: '95%' }} />
      <View style={{ ...styles.subtitle, width: '90%' }} />
      <View style={{ ...styles.subtitle, width: '30%', marginBottom: 40 }} />
      <View style={{ ...styles.title, width: '50%' }} />
      <View style={{ ...styles.title, width: '50%', marginBottom: 30 }} />
      <View style={{ ...styles.title, width: '100%' }} />

    </View>
  );
};

const styles = StyleSheet.create({
  mainbox: {
    zIndex: 20,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingBottom: 30,
    paddingTop: 20,
  },
  imageSkeleton: {
    width: '100%',
    height: 300,
    backgroundColor: '#F1EDEA',
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    height: 25,
    backgroundColor: '#F1EDEA',
    marginBottom: 10,
  },
  subtitle: {
    height: 15,
    backgroundColor: '#F1EDEA',
    marginBottom: 10,
  },
});

export default PostCardSkeleton;
