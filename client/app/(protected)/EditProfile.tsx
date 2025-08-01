import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { API_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { fetchMe } from "../utils/api";
import { Me } from "../types/types";
const size = Dimensions.get("window").width * 0.1;

const EditProfile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    fetchMe()
      .then((user) => {
        setMe(user);
        if (user.image) {
          setImage(user.image);
        }
      })
      .catch((err) => setError(err.message || "Failed to load users"));
  }, []);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setError("Permission to access media library is required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);

      const base64 = result.assets[0].base64;
      if (base64) {
        setImageBase64(`data:image/jpeg;base64,${base64}`);
      } else {
        setError("Failed to get base64 image data");
      }
    }
  };

  const handleEditProfile = async (name: string, password: string) => {
    try {
      const myId = await AsyncStorage.getItem("id");
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
          image: imageBase64,
        }),
      });
      const data = await results.json();
      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setName(data.name || "");
      setPassword(data.password || "");
    } catch (err: any) {
      setError(err.message || "Failed to load users");
      console.error(err.message);
    }
  };

  return (
    <View style={styles.container}>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.userImage}
        />
      )}

      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.text}>Choose Picture</Text>
      </Pressable>

      <TextInput
        style={styles.input}
        placeholder="Change a name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (error) setError("");
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Change a password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (error) setError("");
        }}
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
   userImage: {
    width: 200,
    height: 200,
    borderRadius: 75,
    alignSelf: "center",
    marginVertical: 20,
  },
});
