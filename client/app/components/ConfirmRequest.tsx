import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
const size = Dimensions.get("window").width * 0.1;
const ConfirmRequest = () => {
  return (
    <Pressable style={styles.button}>
      <Text>Confirm</Text>
    </Pressable>
  );
};

export default ConfirmRequest;
const styles = StyleSheet.create({
  userText: {
    fontSize: 20,
    marginVertical: 4,
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#DEE791",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    width: 140,
    backgroundColor: "#ff8989ff",
  },

  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
