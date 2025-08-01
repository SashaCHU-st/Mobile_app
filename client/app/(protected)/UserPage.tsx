import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Image, StyleSheet, Dimensions, Text } from "react-native";
import UserInfo from "../components/UserInfo";
import dog from "../../assets/images/dog.jpg";
import { Me } from "../types/types";
import { API_URL } from "../config";
import { fetchMe } from "../utils/api";

export default function UserPage() {
  const [error, setError] = useState<string>("");
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    fetchMe()
      .then(setMe)
      .catch((err) => setError(err.message || "Failed to load users"));
  }, []);
  return (
    <View style={styles.container}>
      <Image source={dog} style={styles.backgroundImage} resizeMode="cover" />
      <View style={styles.overlay} />
      {me && (
        <UserInfo
          image={me.image}
          id={me.id}
          name={me.name}
          email={me.email}
          password={me.password}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: 1200,
    height: 1500,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 226, 169, 0.4)",
  },
  text: {
    position: "absolute",
    top: 50,
    left: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    zIndex: 10,
  },
});
