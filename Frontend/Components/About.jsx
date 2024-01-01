import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

import gagan from "../dp_gagn.jpg";
import vinay from "../dp_vinay.jpg";
import ayush from "../dp_ayush.jpg";

const AboutUsPage = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>About Us</Text>
      <View style={styles.teamContainer}>
        <View style={styles.teamMember}>
          <Image source={gagan} style={styles.dp} />
          <Text style={styles.memberName}>Subham Dixit</Text>
          {/* <Text style={styles.memberRole}>Software Engineer</Text> */}
        </View>
        <View style={styles.teamMember}>
          <Image source={vinay} style={styles.dp} />
          <Text style={styles.memberName}>Ayush Tiwari</Text>
          {/* <Text style={styles.memberRole}>Software Engineer</Text> */}
        </View>
        <View style={styles.teamMember}>
          <Image source={ayush} style={styles.dp} />
          <Text style={styles.memberName}>Vinay Arjariya</Text>
          {/* <Text style={styles.memberRole}>Software Engineer</Text> */}
        </View>
      </View>
      <Text style={styles.description}>
        We are a team of passionate software engineers who are dedicated to
        helping everyone stay connected and compete with their eSport gaming
        skills. Our mission is to provide a platform where gamers can showcase
        their talents and engage in friendly competition.
      </Text>
      <Text style={styles.description}>
        Whether you're a casual gamer or a competitive player, our platform
        offers a range of features to enhance your gaming experience. Join us
        today and become part of our vibrant gaming community!
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "black",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    marginLeft: "35%",
  },
  teamContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  teamMember: {
    alignItems: "center",
  },
  dp: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "white",
  },
  memberRole: {
    fontSize: 14,
    color: "white",
  },
  description: {
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 24,
    color: "white",
  },
});
export default AboutUsPage;
