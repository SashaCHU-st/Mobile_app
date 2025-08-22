import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { API_URL } from "../config";
import { User } from "../types/types";
import dog from "../../assets/images/dog.jpg";
import DeleteFriends from "../components/Friends/DeleteFriends";
import BackButton from "../components/Helpers/BackButton";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import SearchUsers from "../components/Users/SearchUsers";
import { ScrollView } from "react-native-gesture-handler";
import { size } from "../utils/size";
import { useRouter } from "expo-router";

const ShowFriends = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

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
      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setFriends(data.friends);
      setAllUsers(data.friends);
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

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text === "") {
      setFriends(allUsers);
    } else {
      const filtered = friends.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setFriends(filtered);
    }
  };

  const moveToChat = async (id: number) => {
    console.log("ID =>", id);
    const myId = await AsyncStorage.getItem("id");
    console.log("MYid=>", myId);
    router.push({
      pathname: "/(protected)/Chat",
      params: { id: id.toString() },
    });
  };
  return (
    <ScrollView>
      <SearchUsers value={search} onChange={handleSearch} />
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No friends</Text>}
        renderItem={({ item: friend }) => (
          <View style={styles.userItem}>
            <Image
              source={friend.image ? { uri: friend.image } : dog}
              style={styles.userImage}
              resizeMode="cover"
            />
            <Text style={styles.userName}>{friend.name}</Text>
            <View style={styles.buttons}>
              <DeleteFriends id={friend.id} onDeleteFriends={fetchFriends} />
              <Pressable
                style={styles.button}
                onPress={() => moveToChat(friend.id)}
              >
                <Text>Chat</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View>
            <BackButton />
          </View>
        }
      />
    </ScrollView>
  );
};

export default ShowFriends;

const styles = StyleSheet.create({
  userName: {
    fontSize: 16,
    marginBottom: 8,
  },
  emptyText: {
    marginTop: 50,
    fontSize: 18,
    color: "#999",
    textAlign: "center",
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
  button: {
    width: 60,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#7A85C1",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
