import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { API_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
const size = Dimensions.get("window").width * 0.1;

const EditProfile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleEditProfile = async (name:string, password:string) => {
    try {
      const myId = await AsyncStorage.getItem("id");
      setId(myId);
      const token = await AsyncStorage.getItem("token");
      const results = await fetch(`${API_URL}/editProfile`, {
        method: "POST",

        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: Number(myId),
          name,
          password,
        }),
      });
      const data = await results.json();
      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setName(data.name);
      setPassword(data.password);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Change a name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Change a password"
        value={password}
        onChangeText={setPassword}
      />
      <Pressable
        style={styles.button}
        onPress={() => handleEditProfile(name, password)}
      >
        <Text style={styles.text}>Change profile</Text>
      </Pressable>
    </View>
  );
};

export default EditProfile;
const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    alignItems: "center",
  },
  button: {
    width: 180,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#DEE791",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },

  buttonSwitcher: {
    width: 200,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#A3DC9A",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
