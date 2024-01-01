import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const CreateContest = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    spotleft: 0,
    roomID: "",
    roomPass: "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://3.108.220.96:5000/CreateContest",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status !== 200) {
        const err = new Error(res.error);
        throw err;
      }
      console.log("contest created");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Contest</Text>
      <TextInput
        style={styles.input}
        placeholder='Name'
        placeholderTextColor='white'
        value={formData.name}
        onChangeText={(value) => handleChange("name", value)}
      />
      <TextInput
        style={styles.input}
        placeholder='Price'
        placeholderTextColor='white'
        value={formData.price.toString()}
        onChangeText={(value) => handleChange("price", parseInt(value))}
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        placeholder='Spot Left'
        placeholderTextColor='white'
        value={formData.spotleft.toString()}
        onChangeText={(value) => handleChange("spotleft", parseInt(value))}
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        placeholder='Room ID'
        placeholderTextColor='white'
        value={formData.roomID}
        onChangeText={(value) => handleChange("roomID", value)}
      />
      <TextInput
        style={styles.input}
        placeholder='Room Password'
        placeholderTextColor='white'
        value={formData.roomPass}
        onChangeText={(value) => handleChange("roomPass", value)}
      />
      <Button title='Create' onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "black",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: "white",
  },
});

export default CreateContest;
