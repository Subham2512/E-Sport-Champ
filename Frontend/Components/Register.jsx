import React, { useState } from "react";
import { Platform } from "react-native";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    dob: new Date(),
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = () => {
    navigation.navigate("login");
  };

  const validateForm = async () => {
    const { name, username, email, mobile, password } = formData;
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const mobileRegex = /^\d+$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
    if (!name.trim()) {
      setError("Name is required");
      return false;
    }

    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return false;
    }

    if (!mobileRegex.test(mobile)) {
      setError("Mobile number must be numeric");
      return false;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 8 characters long with at least one lowercase letter, one uppercase letter, one digit, and one special character"
      );
      return false;
    }

    setError(""); // Clear any previous errors
    return true;
  };

  const handleSubmit = async () => {
    if (await validateForm()) {
      try {
        // Check if the username exists
        await checkAvailability("username", formData.username);

        // Check if the email exists
        await checkAvailability("email", formData.email);

        // Check if the mobile number exists
        await checkAvailability("mobile", formData.mobile);

        // If all checks pass, submit the registration form
        const response = await axios.post(
          "http://3.108.220.96:5000/Register",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        navigation.navigate("login");
        setFormData({
          name: "",
          username: "",
          email: "",
          mobile: "",
          password: "",
          dob: new Date(),
        });
        Alert.alert("Registration successful", "You can now log in.");
      } catch (error) {
        // console.error(error);
        if (!error.response.status === 401)
          setError("Registration failed. Please try again.");
      }
    }
  };

  const checkAvailability = async (type, value) => {
    try {
      await axios.post(
        "http://3.108.220.96:5000/check-user-exist",
        { type, value },
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "json",
        }
      );
    } catch (err) {
      // console.log(type);
      if (type === "username") {
        console.log(type);
        setError("Username exists! Please choose another :)");
      } else if (type === "email") {
        setError("Email already exists!");
      } else if (type === "mobile") {
        setError("Mobile number already exists!");
      } else {
        setError("Registration failed. Please try again.");
      }
      throw err; // Re-throw the error to stop further processing if a check fails
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder='Name'
        placeholderTextColor='white'
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Username'
        placeholderTextColor='white'
        value={formData.username}
        onChangeText={(text) => handleChange("username", text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Email'
        placeholderTextColor='white'
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Mobile Number'
        placeholderTextColor='white'
        value={formData.mobile}
        onChangeText={(text) => handleChange("mobile", text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        placeholderTextColor='white'
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
      />

      <Text style={styles.dateText}>Date of Birth</Text>
      {Platform.OS === "ios" && (
        <DateTimePicker
          style={styles.date}
          testID='dateTimePicker'
          value={formData.dob}
          onChange={(event, selectedDate) => handleChange("dob", selectedDate)}
          display='spinner'
          textColor='white'
        />
      )}

      <TouchableOpacity
        style={styles.registerButton} // Apply custom styles here
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={{ color: "white" }}>Already have an account?</Text>
        <Button title='Login' onPress={handleClick} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
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
  date: {
    fontSize: 16,
    textAlign: "center",
    // marginBottom: 10,
    color: "white",
    height: 150,
  },
  dateText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "white",
    // height: 100,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  loginText: {
    textAlign: "center",
    marginTop: 10,
    color: "blue",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  datePickerContainer: {
    marginBottom: 15,
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
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default Register;
