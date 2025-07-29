import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { API_URL } from "../config";
import { User } from "../types/types";
import Header from "../components/Header";

const ShowUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const results = await fetch(`${API_URL}/users`);
        const data = await results.json();

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
    <View>
      <Header />
      {users.length === 0 ? (
        <Text>No users found.</Text>
      ) : (
        users.map((user) => (
          <Text key={user.id} style={styles.userText}>
            {user.id} : {user.name}
          </Text>
        ))
      )}
    </View>
  );
};

export default ShowUsers;

const styles = StyleSheet.create({
  userText: {
    fontSize: 20,
    marginVertical: 4,
  },
});
