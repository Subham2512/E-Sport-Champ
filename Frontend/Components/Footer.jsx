import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import the necessary vector icons

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <Text>
          &copy; {new Date().getFullYear()} E-Sport-Champ. All rights reserved.
        </Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity
            onPress={() => {
              // Handle the Facebook link
            }}
            style={styles.socialIcon}>
            <FontAwesome name='facebook-square' size={24} color='blue' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Handle the Twitter link
            }}
            style={styles.socialIcon}>
            <FontAwesome name='twitter' size={24} color='blue' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Handle the Instagram link
            }}
            style={styles.socialIcon}>
            <FontAwesome name='instagram' size={24} color='purple' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  socialIcons: {
    flexDirection: "row",
  },
  socialIcon: {
    marginHorizontal: 10,
  },
});

export default Footer;
