import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

function Card(props) {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const isLoggedIn = useSelector((state) => state.login);
  const userId = useSelector((state) => state.userId);
  const [isRegistered, setRegistered] = useState(false);
  const [message, setMessage] = useState("Are you sure want to proceed!");
  const [contestStatus, setContestStatus] = useState("live");
  const timerTimestamp = Date.parse(props.timerExpiresAt);
  const [remainingTime, setRemainingTime] = useState(
    timerTimestamp - new Date()
  );
  const openPopup = () => {
    // console.log(contestStatus);
    if (!isLoggedIn) {
      navigation.navigate("login");
      // Handle navigation to login screen
      return null;
    } else if (contestStatus === "expired") {
      navigation.navigate("expiredContest", { contestId: props.id });
    } else {
      if (props.registeredPlayers && props.registeredPlayers.includes(userId)) {
        setMessage("You have been registered for this contest!");
      } else {
        setMessage("Are you sure want to proceed!");
      }
      // console.log(userId);
      setIsOpen(true);
    }
    // console.log("hi");
  };

  useEffect(() => {
    const timerInterval = setInterval(async () => {
      const timeDiff = timerTimestamp - new Date();
      if (timeDiff <= 0) {
        clearInterval(timerInterval);
        setContestStatus("expired");
        await axios.post(
          "http://3.108.220.96:5000/contest-expired",
          { contestId: props.id },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        setRemainingTime(timeDiff);
      }
    }, 1000); // Update every second

    return () => {
      clearInterval(timerInterval);
    };
  }, [props]);

  const formatTime = (milliseconds) => {
    // Ensure that the input is a non-negative number
    if (typeof milliseconds !== "number" || milliseconds < 0) {
      return "00:00:00";
    }
    // console.log(milliseconds);
    // Calculate hours, minutes, and seconds from milliseconds
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Add leading zeros to ensure two-digit format
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    // Create the formatted time string (HH:MM:SS)
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const closePopup = () => {
    setIsOpen(false);
    setRegistered(false);
    // setMessage("");
  };

  const handleSubmit = async () => {
    if (props.spotLeft > 0) {
      try {
        const res = await axios.post(
          "http://3.108.220.96:5000/get-user-profile",
          { userId: userId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.status === 200) {
          const err = new Error(res.error);
          throw err;
        }
        try {
          res_update_balance = await axios.post(
            "http://3.108.220.96:5000/update-balance",
            { userId: userId, amount: props.price },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!res_update_balance.status === 200) {
            const err = new Error(res_update_balance.error);
            throw err;
          }
          const data = {
            to: res.data.user.email,
            subject: "Your E-Sport-Champ Erangle Room Credential",
            text: `RoomID: ${props.roomID}, Pass: ${props.roomPass}`,
          };
          try {
            console.log(data);
            res_send_email = await axios.post(
              "http://3.108.220.96:5000/send-email",
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (!res_send_email.status === 200) {
              const err = new Error(res_send_email.error);
              throw err;
            }
            try {
              const res_contest = await axios.post(
                "http://3.108.220.96:5000/Contest",
                { id: props.id, userId: userId },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              if (!res_contest.status === 200) {
                const err = new Error(res_contest.error);
                throw err;
              }
            } catch (err) {
              if (err.response.status === 401) {
                setMessage("Error registering");
                return;
              }
            }
            // console.log("mail sent");
          } catch (err) {
            if (err.response.status === 500) {
              setMessage("Mail not sent!");
              return;
            }
          }
          // console.log("balance updated");
        } catch (err) {
          if (err.response.status === 401) {
            setMessage("Insufficient Fund!");
            return;
          }
        }
      } catch (err) {
        if (err.response.status === 401) {
          setMessage("User not found!");
          return;
        }
      }

      setRegistered(true);
      setMessage("You have been registered!");
      const updatedSpotLeft = props.spotLeft - 1; // Decrement the spotLeft by 1
      props.setSpotLeft(props.id, updatedSpotLeft);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={openPopup} style={styles.card}>
        <Text style={styles.cardTime}>{formatTime(remainingTime)}</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{props.name}</Text>
          <Image
            source={{ uri: "http://picsum.photos/500/50" }}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>Entry Fee: ₹{props.price}</Text>
          <Text style={styles.cardText}>Spots Left: {props.spotLeft}</Text>
        </View>
      </TouchableOpacity>
      <Modal visible={isOpen} animationType='slide'>
        <View style={styles.popup}>
          <Text style={styles.popupText}>{message}</Text>
          <View style={styles.popupButtons}>
            {isRegistered ? (
              <View>
                <Text style={styles.popupSuccessText}>
                  Your room credentials will be emailed to you. Thank you!
                </Text>
                <Button title='Ok' onPress={closePopup} />
              </View>
            ) : (
              <View>
                {message === "Are you sure want to proceed!" && (
                  <Button title='Confirm' onPress={handleSubmit} />
                )}
                <Button title='Cancel' onPress={closePopup} />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%", // 90% of the screen width
    height: "auto", // 10% of the screen height
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row", // Layout in a row
    justifyContent: "space-between", // Align items with space between
    alignItems: "center", // Center items vertically
    backgroundColor: "#abc",
    borderRadius: 8,
    elevation: 4,
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: "row", // Layout in a row
    alignItems: "center", // Center items vertically
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 0, // Add space to the left of the title
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft: 2,
    marginRight: 1, // Half of width and height for circular shape
  },
  cardText: {
    margin: 5,
    fontSize: 12, // Decrease font size for smaller text
    color: "#777",
  },
  cardTime: {
    marginLeft: "80%",
    fontSize: 12, // Decrease font size for smaller text
    color: "#777",
  },
  popup: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popupText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  popupSuccessText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "green",
  },
  popupButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default Card;
