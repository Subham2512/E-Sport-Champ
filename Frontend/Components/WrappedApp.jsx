import React, { createContext, useEffect } from "react";
import { StyleSheet, View } from "react-native"; // Import from react-router-native
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";

import Header from "./Header";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Contest from "./Contest";
import Register from "./Register";
import Login from "./Login";
import Wallet from "./wallet";
import Transactions from "./Transactions";
import ProtectedRoutes from "./ProtectedRoutes";
import CreateContest from "./CreateContest";
import ProfilePage from "./ProfilePage";
import ChangeEmailForm from "./ChangeEmail";
import ChangePasswordForm from "./ChangePassword";
import ExpiredContest from "./ExpiredContest";
import * as actions from "../state/index";
import { loginState, loggedUser, userId } from "../state/actions/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

function WrappedApp() {
  const dispatch = useDispatch();
  const Stack = createStackNavigator();

  const fetchUserData = async () => {
    try {
      // Get the JWT token from AsyncStorage
      const token = await AsyncStorage.getItem("authToken");
      console.log(token);
      // Set the Authorization header with the token
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Make a request to a protected API route
      const response = await axios.get("http://3.108.220.96:5000/login");
      if (!response.status === 200) {
        const err = new Error(response.error);
        throw err;
      }
      // console.log(response.data.userId);
      dispatch(loggedUser(response.data.loggedUser));
      dispatch(loginState(true));
      dispatch(userId(response.data.userId));
    } catch (err) {
      console.log(err);
      dispatch(loginState(false));
      // console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // Check if a token exists in AsyncStorage on app start
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        // Token exists, fetch user data
        fetchUserData();
      }
    };

    checkToken();
  }, []);

  return (
    // <Router>
    //   <View>
    //     <Header />
    //     {/* Define your routes */}
    //     <Route path='/' component={Contest} />
    //     <Route path='/about' element={<ProtectedRoutes Component={About} />} />
    //     <Route path='/contact' component={Contact} />
    //     <Route path='/register' component={Register} />
    //     <Route path='/login' component={Login} />
    //     {/* <Route path='/paymentPage' component={PaymentPage} /> */}
    //     <Route path='/CreateContest' component={CreateContest} />
    //     <Route
    //       path='/wallet'
    //       element={<ProtectedRoutes Component={Wallet} />}
    //     />
    //     <Route
    //       path='/transaction'
    //       element={<ProtectedRoutes Component={Transactions} />}
    //     />
    //     <Route
    //       path='/profile'
    //       element={<ProtectedRoutes Component={ProfilePage} />}
    //     />
    //     <Route
    //       path='/changeEmail'
    //       element={<ProtectedRoutes Component={ChangeEmailForm} />}
    //     />
    //     <Route
    //       path='/changePassword'
    //       element={<ProtectedRoutes Component={ChangePasswordForm} />}
    //     />
    //     <Footer />
    //   </View>
    // </Router>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='contest' component={Contest} />
        <Stack.Screen name='about' component={About} />
        <Stack.Screen name='login' component={Login} />
        <Stack.Screen name='register' component={Register} />
        <Stack.Screen name='contact' component={Contact} />
        <Stack.Screen name='createcontest' component={CreateContest} />
        <Stack.Screen name='wallet' component={Wallet} />
        <Stack.Screen name='transactions' component={Transactions} />
        <Stack.Screen name='profile' component={ProfilePage} />
        <Stack.Screen name='changeEmail' component={ChangeEmailForm} />
        <Stack.Screen name='changePassword' component={ChangePasswordForm} />
        <Stack.Screen name='expiredContest' component={ExpiredContest} />
      </Stack.Navigator>
      <Header />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  contestContainer: {
    backgroundColor: "black",
  },
});

export default WrappedApp;
