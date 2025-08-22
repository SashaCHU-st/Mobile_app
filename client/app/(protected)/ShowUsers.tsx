import React, { useState, useEffect, useCallback, use } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { API_URL } from "../config";
import { useFocusEffect } from "@react-navigation/native";
import { User } from "../types/types";
import AddFriend from "../components/Friends/AddFriend";
import BackButton from "../components/Helpers/BackButton";
import dog from "../../assets/images/dog.jpg";
import { size } from "../utils/size";
import SearchUsers from "../components/Users/SearchUsers";
import { ScrollView } from "react-native-gesture-handler";

const ShowUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");

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
      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setUsers([...data.Users]);
      setAllUsers(data.Users);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  if (error) {
    return (
      <View>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }
  const handleFriendAdded = (friendId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === friendId
          ? { ...user, confirmrequest: 2, requestFrom: "sent" }
          : user
      )
    );
  };
  const handleSearch = (text: string) => {
    setSearch(text);
    if (text === "") {
      setUsers(allUsers);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setUsers(filtered);
    }
  };
  return (
    <ScrollView>
      <SearchUsers value={search} onChange={handleSearch} />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No users found.</Text>
        }
        renderItem={({ item: user }) => (
          <View style={styles.userItem}>
            <Image
              source={user.image ? { uri: user.image } : dog}
              style={styles.userImage}
              resizeMode="cover"
            />
            <Text style={styles.userName}>{user.name}</Text>
            <AddFriend
              id={user.id}
              status={user.confirmrequest ?? null}
              requestFrom={user.requestFrom ?? null}
              onFriendAdded={() => handleFriendAdded(user.id)}
            />
          </View>
        )}
        ListFooterComponent={
          <View style={{ marginTop: 20 }}>
            <BackButton />
          </View>
        }
      />
    </ScrollView>
  );
};

export default ShowUsers;

const styles = StyleSheet.create({
  userItem: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  searchRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  button: {
    width: 120,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#7A85C1",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 50,
    fontSize: 18,
    color: "#999",
    textAlign: "center",
  },
  userName: {
    fontSize: 16,
    marginBottom: 8,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginVertical: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
  },
});
