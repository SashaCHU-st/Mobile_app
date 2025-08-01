import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { use, useState } from "react";
import { API_URL } from "../config";
import { AddFriendProps } from "@/app/types/types";
const size = Dimensions.get("window").width * 0.1;

const AddFriend: React.FC<AddFriendProps> = ({ id ,onFriendAdded}) => {
  const [error, setError] = useState<string>("");
  const [sentRequest, setSendRequest] = useState(false);
  const handleAddFriends = async (friendsId: number) => {
    const myId = await AsyncStorage.getItem("id");
    const token = await AsyncStorage.getItem("token");
    try {
      const results = await fetch(`${API_URL}/addFriend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: Number(myId),
          friendsId,
        }),
      });
      const data = await results.json();
      if (!results.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${results.status}`
        );
      }
       if (onFriendAdded)
          onFriendAdded();
    } catch (err: any) {
      console.error("Error", err);
      setError(err.message || "Something went wrong");
    }
  };
  return (
    <View>
      <Pressable
        style={[
          styles.button,
          sentRequest && styles.disabledButton, // Apply different style if disabled
        ]}
        onPress={() => {
          handleAddFriends(id);
          setSendRequest(true);
        }}
        disabled={sentRequest} // 🔒 disables the button after request is sent
      >
        {sentRequest ? (
          <Text style={styles.text}>Request sent</Text>
        ) : (
          <Text style={styles.text}>Add friend</Text>
        )}
      </Pressable>
    </View>
  );
};

export default AddFriend;

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
  disabledButton: {
    width: 140,
    backgroundColor: "#ff8989ff",
  },

  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
