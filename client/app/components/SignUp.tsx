import {
  View,
  Text,
  Dimensions,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { API_URL } from "../config";

interface AuthProps {
  email: string;
  setEmail: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  login: boolean;
  setLogin: (value: boolean) => void;
}

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
      if (!results.ok) throw new Error(`HTTP error! status: ${results.status}`);
    } catch (err) {
      console.error("Error", err);
    }

    router.push("/screens/UserPage");
  };
  return (
    <View style={styles.container}>
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
  buttonSwitcher: {
    width: 200,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#FFD6BA",
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
