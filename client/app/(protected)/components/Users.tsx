import React, { useState } from "react";
import { View, Pressable, Text, Dimensions, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const size = Dimensions.get("window").width * 0.1;
const Users = () => {
  const router = useRouter();
  const handleShowUsers = async () => {
    router.push("/(protected)/ShowUsers");
  };
  return (
    <View>
      <Pressable style={styles.button} onPress={handleShowUsers}>
        <Text style={styles.text}>Show Users</Text>
      </Pressable>
    </View>
  );
};

export default Users;
const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
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
