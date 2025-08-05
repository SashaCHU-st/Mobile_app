import React from 'react'
import { Pressable, Text, Dimensions, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
const size = Dimensions.get("window").width * 0.1;
const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable  style={styles.button} onPress={() => navigation.goBack()}>
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