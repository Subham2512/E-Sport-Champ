import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Perform submission logic here
    // You can use the 'name', 'email', and 'message' states to send data to your backend
  };

  return (
    <View style={styles.contactUsContainer}>
      <Text style={styles.heading}>Contact Us</Text>
      <Text style={styles.whiteText}>
        We'd love to hear from you! Reach out to us using the form below.
      </Text>

      <View style={styles.contactForm}>
        <View style={styles.formGroup}>
          <Text style={styles.whiteText}>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(value) => setName(value)}
            placeholder='Your Name'
            placeholderTextColor='white'
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.whiteText}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder='Your Email'
            placeholderTextColor='white'
            keyboardType='email-address'
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.whiteText}>Message:</Text>
          <TextInput
            style={styles.textArea}
            value={message}
            onChangeText={(value) => setMessage(value)}
            placeholder='Your Message'
            placeholderTextColor='white'
            multiline
            numberOfLines={4}
          />
        </View>
        <Button title='Submit' onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactUsContainer: {
    padding: 20,
    backgroundColor: "black",
    height: "100%",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    margin: "35%",
  },
  contactForm: {
    marginTop: 10,
  },
  formGroup: {
    marginBottom: 15,
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
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: "top",
  },
  whiteText: {
    color: "white",
  },
});

export default ContactUs;
