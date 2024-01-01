import React, { useState } from "react";
import axios from "axios";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { bindActionCreators } from "redux";
// import * as actions from "../state/index";
import { loginState, loggedUser, userId } from "../state/actions/index";

const Login = () => {
  const dispatch = useDispatch();
  // const { loginState, loggedUser } = bindActionCreators(actions, dispatch);
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleClick = () => {
    navigation.navigate("register");
  };

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      res = await axios.post("http://3.108.220.96:5000/Login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(res.data.id);
      setTimeout(() => {
        dispatch(loggedUser(formData.username));
        dispatch(loginState(true));
        dispatch(userId(res.data.id));
        // Handle navigation to the home screen
        setFormData({
          username: "",
          password: "",
        });
        navigation.navigate("contest");
      }, 100);
      await AsyncStorage.setItem("authToken", res.data.token);
      // const token = await AsyncStorage.getItem("authToken");
      // console.log(token, res);
    } catch (err) {
      if (err.response.status === 401) {
        setError("Invalid username or password");
      }
    }
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder='Username'
        placeholderTextColor='white'
        value={formData.username}
        onChangeText={(value) => handleChange("username", value)}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        placeholderTextColor='white'
        secureTextEntry={true}
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
      />
      <TouchableOpacity
        style={styles.registerButton} // Apply custom styles here
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={{ color: "white" }}>Not registered?</Text>
        <Button title='Register' onPress={handleClick} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "black",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    color: "white",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  registerButton: {
    width: "30%",
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8, // Adjust the border radius as needed
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "35%",
  },
});

export default Login;
