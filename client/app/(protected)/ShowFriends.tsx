import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { API_URL } from "../config";
import { User } from "../types/types";
import DeleteFriends from "../components/DeleteFriends";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
const size = Dimensions.get("window").width * 0.1;

const ShowFriends = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [myId, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const myId = await AsyncStorage.getItem("id");
        setId(myId);
        const token = await AsyncStorage.getItem("token");
        const results = await fetch(`${API_URL}/myFriends`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: Number(myId),
          }),
        });
        const data = await results.json();
        if (!results.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        setFriends(data.friends);
      } catch (err: any) {
        setError(err.message || "Failed to load users");
      }
    };

    fetchFriends();
  }, []);

  if (error) {
    return (
      <View>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      {/* <Header /> */}
      {friends.length === 0 ? (
        <Text>No users found.</Text>
      ) : (
        friends
          .filter((friend) => friend.id !== Number(myId))
          .map((friend) => (
            <Text key={friend.id} style={styles.friendText}>
              {friend.name}
              <DeleteFriends
              id = {friend.id}/>
            </Text>
          ))
      )}
      <View>
        <BackButton />
      </View>
    </View>
  );
};

export default ShowFriends;

const styles = StyleSheet.create({
  friendText: {
    fontSize: 20,
    marginVertical: 4,
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#DEE791",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
