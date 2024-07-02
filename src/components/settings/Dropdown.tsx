import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
  } from "react-native";
  import React, { Children, ReactNode, useState } from "react";
  import { globalStyles } from "../global";
  
  const downArrow = require("../../assets/icons/freebites/chevron-left.png");
  
  interface DropdownProps {
    title: string;
    children?: ReactNode;
  }
  
  // Enable LayoutAnimation on Android
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  
  const Dropdown = (props: DropdownProps) => {
    const { title, children } = props;
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsOpen(!isOpen);
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleDropdown}>
          <View style={styles.header}>
            <Text>{title}</Text>
            <Image
              source={downArrow}
              style={[
                styles.image,
                { transform: [{ rotate: isOpen ? "180deg" : "0deg" }] },
              ]}
            />
          </View>
        </TouchableOpacity>
        {isOpen && <View>{children}</View>}
      </View>
    );
  };
  export default Dropdown;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    image: {
      height: 20,
      width: 20,
    },
  });
  