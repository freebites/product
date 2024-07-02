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
import React, { Children, ReactNode, useState, useEffect } from "react";
import { globalStyles } from "../global";

const downArrow = require("../../assets/icons/freebites/chevron-left.png");

interface DropdownProps {
  title: string;
  children?: ReactNode;
  timeout?: number;
}

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Dropdown = (props: DropdownProps) => {
  const { title, children, timeout } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [showChildren, setShowChildren] = useState(false);
  let timeoutId: NodeJS.Timeout | null = null;

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      setShowChildren(isOpen); // Show children after timeout
    }, timeout);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Image
            source={downArrow}
            style={[
              styles.image,
              { transform: [{ rotate: isOpen ? "180deg" : "0deg" }] },
            ]}
          />
        </View>
      </TouchableOpacity>
      {isOpen && <View style={styles.children}>{children}</View>}
    </View>
  );
};
export default Dropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFCFA",
    borderRadius: 20,
    padding: 25,
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    height: 20,
    width: 20,
  },
  title: {
    fontSize: 14,
    color: "#58565D",
    fontWeight: "600",
  },
  children: {
    marginTop: 15,
  },
});
