import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { API_URL } from "../config";
import { User } from "../types/types";
import dog from "../../assets/images/dog.jpg";
import DeleteFriends from "../components/DeleteFriends";
import BackButton from "../components/BackButton";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
const size = Dimensions.get("window").width * 0.1;

const ShowFriends = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  const fetchFriends = async () => {
    try {
      const myId = await AsyncStorage.getItem("id");
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
      console.log("Data=>", data)
      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setFriends(data.friends);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    }
  };

useFocusEffect(
  useCallback(() => {
    fetchFriends(); 
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
    <FlatList
      data={friends}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={{ padding: 10 }}
      ListEmptyComponent={<Text>NO friends</Text>}
      renderItem={({ item: friend }) => (
        <View style={styles.userItem}>
          <Image
            source={friend.image ? { uri: friend.image } : dog}
            style={styles.userImage}
            resizeMode="cover"
          />
          <Text style={styles.userName}>
            {friend.id} {friend.name}
          </Text>
          <DeleteFriends id={friend.id} onDeleteFriends={fetchFriends} />
        </View>
      )}
      ListFooterComponent={
        <View>
          <BackButton />
        </View>
      }
    />
  );
};

export default ShowFriends;

const styles = StyleSheet.create({
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
});
