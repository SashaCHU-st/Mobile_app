import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../config";
import * as ImagePicker from "expo-image-picker";
import { fetchMe } from "../../utils/api";
import { Me } from "../../types/types";
import dog from "../../../assets/images/dog.jpg";
import { size } from "../../utils/size";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [updated, setUpdated] = useState<string>("");
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
      const results = await fetch(`${API_URL}/editProfile`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
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
      setUpdated(data.message || "Profile updated");
    } catch (err: any) {
      setError(err.message || "Failed to load users");
      console.error(err.message);
    }
  };

  return (
    <View>
      <View style={styles.userItem}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {updated ? <Text style={styles.updatedText}>{updated}</Text> : null}
        {image ? (
          <Image source={{ uri: image }} style={styles.userImage} />
        ) : (
          <Image source={dog} style={styles.userImage} />
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
            setUpdated("");
            if (error) setError("");
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Change a password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setUpdated("");
            if (error) setError("");
          }}
        />

        <Pressable
          style={styles.button}
          onPress={() => handleEditProfile(name, password)}
        >
          <Text style={styles.text}>Change </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
  },
  button: {
    width: 180,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#7A85C1",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  updatedText: {
    color: "green",
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
