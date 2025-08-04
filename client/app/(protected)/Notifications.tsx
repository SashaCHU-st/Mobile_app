import { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import { User } from "../types/types";

const Notifications = () => {
  const [error, setError] = useState("");
  const [showRequests, setShowRequests] = useState(false);
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
      console.log("DATa=>", data.user);
      setFriendRequest([data.user]);
      setShowRequests(true);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    }
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleNotifications}>
        <Text style={styles.buttonText}>Notification</Text>
      </Pressable>
      {showRequests && (
        <FlatList
          data={friendRequests}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ padding: 10 }}
          ListEmptyComponent={<Text>No requests</Text>}
          renderItem={({ item: friendRequest }) => (
            <View>
              <Text>
                {friendRequest.id}:{friendRequest.name}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Notifications;
const styles = StyleSheet.create({
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
});
