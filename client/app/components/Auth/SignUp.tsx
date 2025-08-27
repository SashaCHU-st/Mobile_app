import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { API_URL } from "../../config";
import { useAuth } from "../../context/Authcontext";
import { AuthProps } from "../../types/types";
import { Ionicons } from "@expo/vector-icons"; // expo install @expo/vector-icons

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
  const { login: loginUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    try {
      const results = await fetch(`${API_URL}/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });
      const data = await results.json();
      await AsyncStorage.setItem("id", String(data.newUser.id));
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
      <Text style={styles.title}>Create Account</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#999"
      />

      {/* Password field */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#999"
        />
        <Pressable
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#555"
          />
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Pressable
        style={styles.switchButton}
        onPress={() => {
          setLogin(true);
          setEmail("");
          setPassword("");
          setName("");
        }}
      >
        {login ? (
          <Text style={styles.switchText}>Already have an account? Log In</Text>
        ) : (
          <Text style={styles.switchText}>Don’t have an account? Sign Up</Text>
        )}
      </Pressable>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F8F9FD",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3B38A0",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginVertical: 8,
    width: "100%",
    backgroundColor: "#fff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginVertical: 8,
    paddingHorizontal: 15,
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  eyeButton: {
    padding: 5,
  },
  button: {
    backgroundColor: "#3B38A0",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  switchButton: {
    marginTop: 15,
  },
  switchText: {
    fontSize: 16,
    color: "#3B38A0",
    paddingBottom: 20,
  },
});
