import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const ExpiredContest = ({ route }) => {
  const [contestData, setContestData] = useState(null);
  useEffect(() => {
    // Fetch contest data based on contestId
    // Replace this with your actual API call or data source
    const fetchContestData = async () => {
      try {
        const response = await axios.get(
          `http://3.108.220.96:5000/Contest/${route.params.contestId}`
        );
        setContestData(response);
      } catch (error) {
        console.error("Error fetching contest data:", error);
      }
    };

    fetchContestData();
  }, [route.params.contestId]);

  if (!contestData) {
    return <Text>Loading...</Text>;
  }

  // Assuming contestData contains winner, performance, and prize data
  const { winner, performance, prize } = contestData;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expired Contest Details</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.header}>Winner</Text>
          <Text style={styles.data}>{winner}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.header}>Game Performance</Text>
          <Text style={styles.data}>{performance}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.header}>Prize</Text>
          <Text style={styles.data}>{prize}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  header: {
    fontWeight: "bold",
  },
  data: {},
});

export default ExpiredContest;
