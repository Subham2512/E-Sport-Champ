import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

function ChangePasswordForm() {
  const username = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    username: username,
  });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!(formData.newPassword === formData.confirmPassword)) {
      setError("New Password and Confirm Password do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://3.108.220.96:5000/update-password",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          username: username,
        });
        setMessage("Your Password Successfully Changed!");
      } else {
        const err = new Error(res.error);
        throw err;
      }
      // Handle success logic here
    } catch (error) {
      // Handle error logic here
      if (err) {
        console.log("Wrong Current Password!");
      }
      console.log(error);
    }
  };

  return (
    <View style={styles.changeForm}>
      <Text style={styles.heading}>Change Password</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {message && <Text style={styles.message}>{message}</Text>}
      <TextInput
        style={styles.input}
        placeholder='Current Password'
        placeholderTextColor='white'
        value={formData.currentPassword}
        onChangeText={(value) => handleChange("currentPassword", value)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder='New Password'
        placeholderTextColor='white'
        value={formData.newPassword}
        onChangeText={(value) => handleChange("newPassword", value)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder='Confirm New Password'
        placeholderTextColor='white'
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange("confirmPassword", value)}
        secureTextEntry
      />
      <Button title='Change Password' onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  changeForm: {
    padding: 20,
    backgroundColor: "black",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  message: {
    color: "green",
    marginBottom: 10,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "white",
  },
});

export default ChangePasswordForm;
