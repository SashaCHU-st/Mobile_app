import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/Authcontext";
const size = Dimensions.get("window").width * 0.1;

const Logout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/");  
  };
  return (
    <View style = {styles.container}>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Logout;
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#DEE791",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
