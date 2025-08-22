import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function App() {
  return (
    <View style={styles.app}>
      <View style={styles.text}>
        <Text>My recipies Mobile App</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: "#B2B0E8",
    alignItems: "center",
    paddingBottom: 20, 
    paddingTop: 20, 
    justifyContent: "center",
  },
  text: {
    justifyContent: "center",
  },
});
