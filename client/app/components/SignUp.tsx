import {
  View,
  Text,
  Dimensions,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { API_URL } from "../config";
import { useAuth } from "../context/Authcontext";
import { AuthProps } from "../types/types";

const size = Dimensions.get("window").width * 0.1;
const SignUp = ({
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  login,
  setLogin,
}: AuthProps) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {login:loginUser} = useAuth();

  const handleSignUp = async () => {
    try {
      const results = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });
      const data = await results.json();
      const myId = await AsyncStorage.setItem("id", String(data.newUser.id));
      // console.log("MyId=>", myId)
      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      loginUser(data.token);
      router.replace("/(protected)/UserPage");
    } catch (err: any) {
      console.error("Error", err);
      setError(err.message || "Something went wrong");
    }

  };
  return (
    <View style={styles.container}>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Enter a email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter a name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter a password"
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.text}>Sign Up</Text>
      </Pressable>
      <Pressable
        style={styles.buttonSwitcher}
        onPress={() => {
          setLogin(true);
          setEmail("");
          setPassword("");
          setName("");
        }}
      >
        {login ? (
          <>
            <Text style={styles.text}>Switch to SignUp </Text>
          </>
        ) : (
          <>
            <Text style={styles.text}>Switch to Login </Text>
          </>
        )}
      </Pressable>
    </View>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    width: 100,
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
