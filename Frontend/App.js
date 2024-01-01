import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Footer from "./Components/Footer";
import WrappedApp from "./Components/WrappedApp";
import { Provider } from "react-redux";
import { store } from "./state/store";

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <WrappedApp />
      </Provider>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
