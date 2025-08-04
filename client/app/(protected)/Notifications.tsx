import { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import dog from "../../assets/images/dog.jpg";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import { User } from "../types/types";
import DeclineRequest from "../components/DeclineRequest";
import ConfirmRequest from "../components/ConfirmRequest";

const Notifications = () => {
  const [error, setError] = useState("");
  const [friendRequests, setFriendRequest] = useState<User[]>([]);

  const handleNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const results = await fetch(`${API_URL}/checkRequests`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await results.json();
      setFriendRequest(data.users);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleNotifications();
    }, [])
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={friendRequests}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={<Text>No requests</Text>}
        renderItem={({ item: friendRequest }) => (
          <View style={styles.userItem}>
            <Image
              source={friendRequest.image ? { uri: friendRequest.image } : dog}
              style={styles.userImage}
              resizeMode="cover"
            />
            <Text style={styles.userName}>{friendRequest.name}</Text>
            <View style={styles.requestButtons}>
              <DeclineRequest
              id ={friendRequest.id} />
              <ConfirmRequest />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Notifications;
const styles = StyleSheet.create({
  requestButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  container: {
    flex: 1,
    paddingTop: 20,
  },
  requestItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#2196f3",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginVertical: 20,
  },
  userName: {
    fontSize: 16,
    marginBottom: 8,
  },
});
