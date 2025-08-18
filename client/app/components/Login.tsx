import {
  View,
  Text,
  Dimensions,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { API_URL } from "../config";
import { useAuth } from "../context/Authcontext";
import { LoginProps } from "../types/types";
const size = Dimensions.get("window").width * 0.1;

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  login,
  setLogin,
}: LoginProps) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { login: loginUser } = useAuth();

  const handleLogin = async () => {
    try {
      const results = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await results.json();
      await AsyncStorage.setItem("id", data.user[0].id);
      if (!results.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${results.status}`
        );
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
      {error ? <Text style={styles.errorText}>{error} </Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Enter a email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter a password"
        value={password}
        onChangeText={setPassword}
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <Pressable
        style={styles.buttonSwitcher}
        onPress={() => {
          setLogin(false);
          setEmail("");
          setPassword("");
        }}
      >
        {login ? (
          <>
            <Text style={styles.textSwitcher}>Switch to Signup </Text>
          </>
        ) : (
          <>
            <Text style={styles.textSwitcher}>Switch to Login </Text>
          </>
        )}
      </Pressable>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    width: 100,
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
  buttonSwitcher: {
    width: 200,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#3B38A0",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  textSwitcher: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
