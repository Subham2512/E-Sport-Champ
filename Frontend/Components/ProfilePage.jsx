import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Text, View, Image, Button, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker from Expo
import { useNavigation } from "@react-navigation/native"; // Import navigation hook from React Navigation
import { userId } from "../state/actions";

const ProfilePage = () => {
  const userId = useSelector((state) => state.userId);
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null);
  const navigation = useNavigation(); // Get navigation object

  const fetchUser = async () => {
    try {
      const response = await axios.post(
        "http://3.108.220.96:5000/get-user-profile",
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.status === 200) {
        const err = new Error(response.error);
        throw err;
      }
      setUser(response.data.user);
      // console.log()
      // if (typeof user.image.uri === String) {
      // }
      // console.log(user);
    } catch (err) {
      navigation.navigate("login"); // Use the navigation object to navigate
    }
  };

  useEffect(() => {
    fetchUser();
  }, [selectedImage]);

  const handleUpload = async () => {
    if (selectedImage) {
      const fileName = selectedImage.uri.split("/").pop();
      const fileType = fileName.split(".").pop();

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("image", {
        uri: selectedImage.uri,
        name: fileName,
        type: fileType,
      });

      try {
        await axios.post("http://3.108.220.96:5000/update-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Update the user image URI immediately after successful upload
        setUser((prevUser) => ({
          ...prevUser,
          image: { uri: selectedImage.uri },
        }));

        setSelectedImage(null);
      } catch (error) {
        console.log("Error uploading image:", error);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const handlePasswordChange = () => {
    // Implement password change logic here
    navigation.navigate("changePassword"); // Use the navigation object to navigate
  };

  const handleEmailChange = () => {
    // Implement email change logic here
    navigation.navigate("phangeEmail"); // Use the navigation object to navigate
  };

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.heading}>Profile</Text>
      {user && (
        <View>
          <View style={styles.profileDetails}>
            <Image
              style={styles.profileImage}
              source={{
                uri: `data:image/jpg;base64,${user.image.uri}`,
              }}
            />
            <View style={styles.imageButtonsContainer}>
              <Button title='Change Profile Pic' onPress={pickImage} />
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={styles.selectedProfileImage}
                />
              )}
              <Button title='Upload' onPress={handleUpload} />
            </View>
            <Text style={styles.profileText}>
              <Text style={styles.boldText}>Username:</Text> {user.username}
            </Text>
            <Text style={styles.profileText}>
              <Text style={styles.boldText}>Email:</Text> {user.email}
            </Text>
            <Text style={styles.profileText}>
              <Text style={styles.boldText}>Date of Birth:</Text>{" "}
              {new Date(user.dob).toLocaleDateString("en-US")}
            </Text>
            <Text style={styles.profileText}>
              <Text style={styles.boldText}>Name:</Text> {user.name}
            </Text>
          </View>
          <View style={styles.actionButtonContainer}>
            <Button
              title='Change Password'
              onPress={handlePasswordChange}
              color='#007AFF' // Blue color
            />
            <Button
              title='Change Email'
              onPress={handleEmailChange}
              color='#007AFF' // Blue color
            />
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333", // Dark gray color
  },
  profileDetails: {
    marginBottom: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  selectedProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  imageButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  profileText: {
    fontSize: 16,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  actionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ProfilePage;
