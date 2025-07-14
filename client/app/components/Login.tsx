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
const size = Dimensions.get("window").width * 0.1;

interface LoginProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  login: boolean;
  setLogin: (value: boolean) => void;
}

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  login,
  setLogin,
}: LoginProps) => {
  const router = useRouter();
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
        placeholder="Enter a password"
        value={password}
        onChangeText={setPassword}
      />
      <Pressable
        style={styles.button}
        onPress={() => router.push("/screens/UserPage")}
      >
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
            <Text style={styles.text}>Switch to Signup </Text>
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

export default Login;
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
