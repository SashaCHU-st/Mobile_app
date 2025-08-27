import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { API_URL } from "../../config";
import { useAuth } from "../../context/Authcontext";
import { LoginProps } from "../../types/types";

const { width } = Dimensions.get("window");

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  login,
  setLogin,
}: LoginProps) => {
  const router = useRouter();
  const { login: loginUser } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      await AsyncStorage.setItem("id", data.user[0].id);
      loginUser(data.token);
      router.replace("/(protected)/UserPage");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable
        style={styles.switcherButton}
        onPress={() => {
          setLogin(!login);
          setEmail("");
          setPassword("");
        }}
      >
        <Text style={styles.switcherButtonText}>
          {login ? "Switch to Signup" : "Switch to Login"}
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
  },
  header: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B38A0",
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3B38A0",
    marginTop: 30,
    marginBottom: 20,
    alignSelf: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
    alignSelf: "center",
  },
  input: {
    width: width * 0.85,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
    alignSelf: "center",
  },
  button: {
    width: width * 0.85,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#7A85C1",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  switcherButton: {
    width: width * 0.85,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#3B38A0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  switcherButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
