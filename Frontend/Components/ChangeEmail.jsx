import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

function ChangeEmailForm() {
  const username = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    currentEmail: "",
    newEmail: "",
    confirmEmail: "",
    username: username,
  });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!(formData.newEmail === formData.confirmEmail)) {
      setError("New Email and Confirm Email do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://3.108.220.96:5000/update-email",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setFormData({
          currentEmail: "",
          newEmail: "",
          confirmEmail: "",
          username: username,
        });
        setMessage("Your Email Successfully Changed!");
      } else {
        const err = new Error(res.error);
        throw err;
      }

      // Handle success logic here
    } catch (error) {
      if (err) {
        console.log("Wrong Current Email!");
      }
      // Handle error logic here
      console.log(error);
    }
  };

  return (
    <View style={styles.changeForm}>
      <Text style={styles.heading}>Change Email</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder='Current Email'
        placeholderTextColor='white'
        value={formData.currentEmail}
        onChangeText={(value) => handleChange("currentEmail", value)}
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder='New Email'
        placeholderTextColor='white'
        value={formData.newEmail}
        onChangeText={(value) => handleChange("newEmail", value)}
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder='Confirm New Email'
        placeholderTextColor='white'
        value={formData.confirmEmail}
        onChangeText={(value) => handleChange("confirmEmail", value)}
        keyboardType='email-address'
      />
      <Button title='Change Email' onPress={handleSubmit} />
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
  input: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "white",
  },
});

export default ChangeEmailForm;
