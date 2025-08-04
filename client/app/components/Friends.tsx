import { router } from "expo-router";
import { View, Pressable, StyleSheet, Dimensions, Text } from "react-native";
const size = Dimensions.get("window").width * 0.1;

const Friends = () => {

    const handleShowFriends = () =>
    {
        router.push("/(protected)/ShowFriends")
    }
  return (
    <View>
        <Pressable style={styles.button} onPress={handleShowFriends}>
            <Text style={styles.text}>Show friends</Text>
        </Pressable>
    </View>
  )
}

export default Friends
const styles = StyleSheet.create({
  button: {
    width: 120,
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