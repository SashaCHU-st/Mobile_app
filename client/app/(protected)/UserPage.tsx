import React, { useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, StyleSheet, Dimensions, Text } from "react-native";
import UserInfo from "../components/UserInfo";
import dog from "../../assets/images/dog.jpg";
import { Me } from "../types/types";
import { API_URL } from "../config";

export default function UserPage() {
    const [error, setError] = useState<string>("");
const [me, setMe] = useState<Me | null>(null);


useEffect (()=>
  {
    const fetchMe = async () =>
      {
      const myId = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("token");
      try
      {
      const results2 = await fetch(`${API_URL}/me`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify({
          userId:myId
        }),
      });
      const data2 = await results2.json();
      if (!results2.ok) {
        throw new Error(data2.message || "Something went wrong");
      }
      setMe(data2.me[0])
      }
      catch(err: any) {
        setError(err.message || "Failed to load users");
      }
    }
    fetchMe()
  }, [])
  return (
    <View style={styles.container}>
      <Image
        source={dog}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      {me && (
      <UserInfo
        id={me.id}
        name={me.name}
        email={me.email}
        password={me.password}
      />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: 1200,   
    height: 1500,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 226, 169, 0.4)",
  },
  text: {
    position: "absolute",
    top: 50,
    left: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    zIndex: 10, 
  },
});
