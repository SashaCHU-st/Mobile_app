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
    backgroundColor: "#A3DC9A",
    alignItems: "center",
    paddingBottom: 30,
    paddingTop: 30,
    justifyContent: "center",
  },
  text: {
    justifyContent: "center",
  },
});
