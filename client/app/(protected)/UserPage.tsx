import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import dog from "../../assets/images/dog.jpg";

const { width, height } = Dimensions.get("window");

export default function UserPage() {
  return (
    <View style={styles.container}>
      <Image
        source={dog}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: width,     // full device width
    height: height,   // full device height
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 226, 169, 0.4)",
  },
});
