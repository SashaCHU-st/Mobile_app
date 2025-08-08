import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import UserInfo from "../components/UserInfo";
import dog from "../../assets/images/dog.jpg";
import { Me } from "../types/types";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { fetchMe } from "../utils/api";
import { notifications as fetchNotifications } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserPage() {
  const [error, setError] = useState<string>("");
  const [me, setMe] = useState<Me | null>(null);
const [notificationCount, setNotificationCount] = useState<number>(0);

useFocusEffect(
  useCallback(() => {
    fetchMe()
      .then(setMe)
      .catch((err) => setError(err.message || "Failed to load users"));

    // fetchNotifications()
    //   .then(setNotificationCount)
    //   .catch((err) => console.error("Failed to fetch notifications:", err));
  }, [])
);

  return (
    <View style={styles.container}>
      <Image source={dog} style={styles.backgroundImage} resizeMode="cover" />
      <View style={styles.overlay} />
      {me && (
        <UserInfo image={me.image} id={me.id} name={me.name} email={me.email} />
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
});
