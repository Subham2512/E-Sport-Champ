import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { loginState } from "../state/actions/index";
import Ionicons from "@expo/vector-icons/Ionicons";

function Header() {
  const navigation = useNavigation(); // Get navigation object
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  // console.log("Redux State:", state);

  const handleSubmit = async () => {
    try {
      await axios.post("http://3.108.220.96:5000/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        Credentials: "include",
      });
      // logout using redux
      dispatch(loginState(false));
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => navigation.navigate("contest")}
          style={styles.navItem}>
          <Ionicons name='home' size={32} color='grey' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("about")}
          style={styles.navItem}>
          <Ionicons name='people' size={32} color='grey' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("contact")}
          style={styles.navItem}>
          <Ionicons name='mail' size={32} color='grey' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("wallet")}
          style={styles.navItem}>
          <Ionicons name='wallet' size={32} color='grey' />
        </TouchableOpacity>

        {login && (
          <TouchableOpacity
            onPress={() => navigation.navigate("profile")}
            style={styles.navItem}>
            <Ionicons name='person' size={32} color='grey' />
          </TouchableOpacity>
        )}

        {login && (
          <TouchableOpacity onPress={handleSubmit} style={styles.navItem}>
            <Ionicons name='log-out' size={32} color='grey' />
          </TouchableOpacity>
        )}
        {!login && (
          <TouchableOpacity
            onPress={() => navigation.navigate("register")}
            style={styles.navItem}>
            {/* <Text>Register/Login</Text> */}
            <Ionicons name='log-in' size={32} color='grey' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
    paddingVertical: 10,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  navItem: {
    paddingHorizontal: 10,
  },
});

export default Header;
