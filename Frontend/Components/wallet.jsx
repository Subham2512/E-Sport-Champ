import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import { userId } from "../state/actions";
import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import RazorpayCheckout from "react-native-razorpay";

const Wallet = () => {
  const userId = useSelector((state) => state.userId);
  const navigation = useNavigation();
  const isLoggedIn = useSelector((state) => state.login);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    amount: "",
    userId: userId,
  });

  // if (!isLoggedIn) {
  //   navigation.navigate("login");
  //   // Handle navigation to login screen
  //   // return;
  //   return null;
  // }

  useEffect(() => {
    const getBalance = async () => {
      try {
        const res = await axios.post(
          "http://3.108.220.96:5000/get-balance",
          { userId: userId },
          { headers: { "Content-Type": "application/json" } }
        );
        // console.log(res.data);
        setBalance(res.data.balance);
      } catch (error) {
        console.error(error);
      }
    };

    getBalance();
  }, [AddMoney]);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const AddMoney = async () => {
    try {
      const order = await axios.post(
        "http://3.108.220.96:5000/AddMoney",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const options = {
        currency: "INR",
        key: "rzp_test_s2VG2G2HwcOQd6",
        amount: order.data.amount,
        currency: "INR",
        name: "Gagan",
      };

      // Initialize and open Razorpay payment
      RazorpayCheckout.open(options)
        .then((data) => {
          // handle success
          alert(`Success: ${data.razorpay_payment_id}`);
        })
        .catch((error) => {
          // handle failure
          alert(`Error: ${error.code} | ${error.description}`);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const upiPay = async () => {
    const appURI = `upi://pay?pa=${process.env.VPA}&pn=${process.env.NAME}&am=${formData.amount}&cu=INR`;
    console.log(appURI);
    // Check if the UPI app is installed on the device
    try {
      await Linking.openURL(appURI);
    } catch (err) {
      setError(`upi app is not installed on this device.`);
    }
  };

  const handleWithdraw = async () => {
    if (balance > 10) {
      try {
        await axios.post(
          "http://3.108.220.96:5000/withdraw-money",
          {
            userId: userId,
            amount: formData.amount,
          },
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      setError("Minimum balance must be 10 to withdraw");
    }
  };

  const handleTransaction = () => {
    // Navigate to transaction history page
    // Use React Navigation or other navigation library
    navigation.navigate("transactions");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Wallet</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Balance:</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={formData.amount}
          onChangeText={(value) => handleChange("amount", value)}
        />
      </View>
      <Text style={styles.balance}>Total Balance: ₹{balance}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.registerButton} // Apply custom styles here
          onPress={AddMoney}>
          <Text style={styles.buttonText}>Add Balance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton} // Apply custom styles here
          onPress={handleWithdraw}>
          <Text style={styles.buttonText}>Withdraw</Text>
        </TouchableOpacity>
        {/* <Button title='Add Balance' onPress={upiPay} />
        <Button title='Withdraw' onPress={handleWithdraw} /> */}
      </View>
      {/* <Button title='Transactions History' onPress={handleTransaction} /> */}
      <TouchableOpacity
        style={styles.registerButton} // Apply custom styles here
        onPress={handleTransaction}>
        <Text style={styles.buttonText}>Transactions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginRight: 10,
    color: "white",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
  balance: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },
  buttons: {
    flexDirection: "row", // Horizontal layout
    justifyContent: "space-between", // Space between the buttons
    paddingHorizontal: 20, // Adjust spacing as needed
    marginTop: 20,
  },
  registerButton: {
    width: "40%",
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8, // Adjust the border radius as needed
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "5%",
    marginTop: "5%",
  },
});
export default Wallet;
