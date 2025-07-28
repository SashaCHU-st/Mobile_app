import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function App() {
  return (
    <View style={styles.app}>
      <View style={styles.text}>
        <Text>My mobile App</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: "#e8e4e2ff",
    alignItems: "center",
    paddingBottom: 30,
    paddingTop: 50,
    justifyContent: "center",
  },
  text: {
    justifyContent: "center",
  },
});
