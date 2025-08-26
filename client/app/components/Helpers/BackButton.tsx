import React from "react";
import { Pressable, Text, Dimensions, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { size } from "@/app/utils/size";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable style={styles.button} onPress={() => navigation.goBack()}>
      <Text style={styles.text}>Go back</Text>
    </Pressable>
  );
};

export default BackButton;
const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#3B38A0",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
