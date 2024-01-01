import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Card from "./Card";
import socket from "../Socket";

function Contest() {
  const [cards, setCards] = useState([]);
  const [change, setChange] = useState("");
  const [contestChoosen, setContestChoosen] = useState("live");
  const GetCard = async () => {
    try {
      const res = await axios.get("http://3.108.220.96:5000/ContestData", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCards(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setChange("");
  };

  useEffect(() => {
    GetCard(); // Call GetCard when the component mounts
  }, [change]);

  const updateSpotLeft = (cardId, newSpotLeft) => {
    // Find the card by ID and update its spotLeft value in the cards state
    // console.log("contest", newSpotLeft);
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, spotLeft: newSpotLeft } : card
      )
    );
    setChange("changed");
  };

  useEffect(() => {
    // Listen for a "spotLeftUpdate" event from the server
    socket.on("spotLeftUpdate", ({ cardId, newSpotLeft }) => {
      updateSpotLeft(cardId, newSpotLeft);
    });

    return () => {
      // Clean up event listeners when the component unmounts
      socket.off("spotLeftUpdate");
    };
  }, []);

  const LiveContest = () => {
    setContestChoosen("live");
  };

  const PastContest = () => {
    setContestChoosen("expired");
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.contestContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={LiveContest}>
            <Text>Live Contest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={PastContest}>
            <Text>Past Contest</Text>
          </TouchableOpacity>
        </View>
        {cards.map(
          (cardInfo) =>
            cardInfo.contestStatus === contestChoosen && (
              <Card
                key={cardInfo._id}
                id={cardInfo._id}
                name={cardInfo.name}
                price={cardInfo.price}
                spotLeft={cardInfo.spotleft} // Pass spotLeft as a prop
                roomID={cardInfo.roomID}
                roomPass={cardInfo.roomPass}
                setSpotLeft={updateSpotLeft} // Pass the updateSpotLeft function
                timerExpiresAt={cardInfo.timerExpiresAt}
                contestStatus={cardInfo.contestStatus}
                registeredPlayers={cardInfo.userJoined}
              />
            )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    // flex: 1,
    backgroundColor: "black", // Set the background color here
  },
  contestContainer: {
    padding: 20,
    height: "100%",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    marginLeft: "35%",
  },
  container: {
    flexDirection: "row", // Arrange children horizontally
    justifyContent: "space-between", // Distribute space between children
    paddingHorizontal: 16,
    paddingBottom: 10, // Optional: Add padding to the buttons
  },
  button: {
    backgroundColor: "purple", // Optional: Set the background color
    paddingVertical: 10, // Optional: Add vertical padding
    paddingHorizontal: 20, // Optional: Add horizontal padding
    borderRadius: 5, // Optional: Add a border radius
  },
  buttonText: {
    color: "white", // Optional: Set the text color
    fontSize: 16, // Optional: Set the text size
  },
});

export default Contest;
