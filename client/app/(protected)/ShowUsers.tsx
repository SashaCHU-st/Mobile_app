import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, Pressable, Dimensions,ScrollView } from "react-native";
import { API_URL } from "../config";
import { User } from "../types/types";
import AddFriend from "../components/AddFriend";
import BackButton from "../components/BackButton";
const size = Dimensions.get("window").width * 0.1;

const ShowUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [myId, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const results = await fetch(`${API_URL}/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await results.json();
        const myId = await AsyncStorage.getItem("id");
        setId(myId);
        if (!results.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        setUsers(data.Users);
      } catch (err: any) {
        setError(err.message || "Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return (
      <View>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {users.length === 0 ? (
        <Text>No users found.</Text>
      ) : (
        users
          .filter((user) => user.id !== Number(myId))
          .map((user) => (
            <Text key={user.id} style={styles.userText}>
              {user.id} : {user.name}
              <AddFriend id={user.id} />
            </Text>
          ))
      )}
      <View>
        <BackButton />
      </View>
    </ScrollView>
  );
};

export default ShowUsers;

const styles = StyleSheet.create({
  userText: {
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
