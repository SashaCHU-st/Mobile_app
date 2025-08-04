import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { API_URL } from "../config";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { User } from "../types/types";
import AddFriend from "../components/AddFriend";
import BackButton from "../components/BackButton";
import dog from "../../assets/images/dog.jpg";
const size = Dimensions.get("window").width * 0.1;

const ShowUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  // const [myId, setId] = useState<string | null>(null);

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
      console.log("data=>", data);
      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setUsers(data.Users);
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

  return (
    /////FLATLIST!!!!
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={{ padding: 10 }}
      ListEmptyComponent={<Text>No users found.</Text>}
      renderItem={({ item: user }) => (
        <View style={styles.userItem}>
          <Image
            source={user.image ? { uri: user.image } : dog}
            style={styles.userImage}
            resizeMode="cover"
          />
          <Text style={styles.userName}>
            {user.id} : {user.name}
          </Text>
          <AddFriend
            id={user.id}
            onFriendAdded={() => {
              fetchUsers();
              // fetchFriends(); 
            }}
          />
        </View>
      )}
      ListFooterComponent={
        <View style={{ marginTop: 20 }}>
          <BackButton />
        </View>
      }
    />
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
});
