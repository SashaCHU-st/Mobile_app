import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { API_URL } from "../../config";
import { useAuth } from "../../context/Authcontext";
import { AuthProps } from "../../types/types";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

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
  const [showPassword, setShowPassword] = useState(false);
  const { login: loginUser } = useAuth();

  const handleSignUp = async () => {
    try {
      const results = await fetch(`${API_URL}/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });
      const data = await results.json();
      if (!results.ok) throw new Error(data.message || "Something went wrong");

      await AsyncStorage.setItem("id", String(data.newUser.id));
      loginUser(data.token);
      router.replace("/(protected)/UserPage");
    } catch (err: any) {
      console.error("Error", err);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Enter a name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#999"
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#555"
          />
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Signup</Text>
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

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
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
  passwordContainer: {
    width: width * 0.85,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
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
