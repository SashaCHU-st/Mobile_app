import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  FlatList,
} from "react-native";
import dog from "../../assets/images/dog.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import { useState } from "react";
import { MyFood } from "../types/types";
import { useRouter } from "expo-router";

const size = Dimensions.get("window").width * 0.1;
const { width } = Dimensions.get("window");

const MyRecepies = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [myFood, setMyFood] = useState<MyFood[]>([]);
  const handleCheckFav = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const results = await fetch(`${API_URL}/myFavorites`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await results.json();
      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      console.log("DATA", data.favorites.rows);
      setMyFood(data.favorites.rows);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    }
  };

  const handleSummary = async (food: MyFood) => {
    router.push({
      pathname: "/summary/Summary",
      params: { recipe: JSON.stringify(food) },
    });
  };
  return (
    <ScrollView>
      <Pressable style={styles.button} onPress={handleCheckFav}>
        <Text>Check my fav</Text>
      </Pressable>
      <FlatList
        data={myFood}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No food found</Text>}
        renderItem={({ item: food }) => (
          <View style={styles.foodItem}>
            <Image
              source={food.image ? { uri: food.image } : dog}
              style={styles.foodImage}
              resizeMode="cover"
            />
            <Pressable onPress={() => handleSummary(food)}>
              <Text>{food.title}</Text>
            </Pressable>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default MyRecepies;
const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#DEE791",
    justifyContent: "center",
    alignItems: "center",
  },
  baseText: {
    fontSize: 15,
    lineHeight: 20,
  },
  emptyText: {
    marginTop: 50,
    fontSize: 18,
    color: "#999",
    textAlign: "center",
  },
  foodItem: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 6,
    padding: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    minWidth: (width - 48) / 2,
  },
  foodImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginVertical: 20,
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
