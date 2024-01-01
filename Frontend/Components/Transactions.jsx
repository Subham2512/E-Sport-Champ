import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";

function TransactionCard({ txnAmount, txnStatus, txnId }) {
  return (
    <View style={styles.card}>
      <Text>{txnAmount}</Text>
      <Text>{txnStatus}</Text>
      <Text>{txnId}</Text>
    </View>
  );
}

const Transactions = () => {
  const username = useSelector((state) => state.user);
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const res = await axios.post(
        "http://3.108.220.96:5000/get-transactions",
        { username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTransactions(res.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <ScrollView>
      <View style={styles.pageContainer}>
        <Text style={styles.title}>Transaction History</Text>
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.txnId}
            txnAmount={transaction.txnAmount}
            txnStatus={transaction.txnStatus}
            txnId={transaction.txnId}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "black", // Set the background color here
  },
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: "grey",
    borderRadius: 5,
    flexDirection: "row", // Display as row
    justifyContent: "space-between", // Space between columns
    alignItems: "center", // Center items vertically
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
});

export default Transactions;
