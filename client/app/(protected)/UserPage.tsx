import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import UserInfo from "../components/UserInfo/UserInfo";
import { Me } from "../types/types";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { fetchMe } from "../utils/api";


export default function UserPage() {
  const [error, setError] = useState<string>("");
  const [me, setMe] = useState<Me | null>(null);


useFocusEffect(
  useCallback(() => {
    fetchMe()
      .then(setMe)
      .catch((err) => setError(err.message || "Failed to load users"));

  }, [])
);

  return (
    <View style={styles.container}>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
});
