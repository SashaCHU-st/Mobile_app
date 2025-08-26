import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  Text,
  FlatList,
} from "react-native";
import dog from "../../assets/images/dog.jpg";
import { API_URL } from "../config";
import { useState } from "react";
import { MyFood } from "../types/types";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { size } from "../utils/size";


const MyRecepies = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [myFood, setMyFood] = useState<MyFood[]>([]);

  const handleCheckFav = async () => {
    try {
      const results = await fetch(`${API_URL}/myFavorites`, {
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
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

  useFocusEffect(
    useCallback(() => {
      handleCheckFav();
    }, [])
  );
  const handleSummary = async (food: MyFood) => {
    router.push({
      pathname: "/summary/Summary",
      params: { recipe: JSON.stringify(food) },
    });
  };
  return (
    <ScrollView>
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
    backgroundColor: "#7A85C1",
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
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  foodImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
