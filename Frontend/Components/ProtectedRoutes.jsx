import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook from React Navigation

const ProtectedRoutes = (props) => {
  const navigation = useNavigation(); // Get the navigation object from React Navigation
  const { Component } = props;
  const isLoggedIn = useSelector((state) => state.login);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Login"); // Use the navigation object to navigate
    }
  }, [isLoggedIn, navigation]); // Make sure to include dependencies in the useEffect's dependency array

  return <Component />;
};

export default ProtectedRoutes;
