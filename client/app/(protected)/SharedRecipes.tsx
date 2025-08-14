import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  FlatList,
} from "react-native";
import { API_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
const size = Dimensions.get("window").width * 0.1;

const SharedRecipes = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [friendsFood, setFriendsFood] = useState<
    { name: string; foods: { title: string; image: string }[] }[]
  >([]);

  const checkFriendsfav = async () => {
    try {
      const myId = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("token");
      const results = await fetch(`${API_URL}/friendsFavorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: Number(myId),
        }),
      });
      const data = await results.json();
      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      const friendsArray = Object.entries(data.checkFriendsFav).map(
        ([name, foods]) => ({
          name,
          foods: foods as { title: string; image: string }[],
        })
      );

      setFriendsFood(friendsArray);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkFriendsfav();
    }, [])
  );

  const handleDetails = (food: { title: string; image: string }) => {
    router.push({
      pathname: "/recipe-details/RecipeDetails",
      params: { recipe: JSON.stringify(food) },
    });
  };
  return (
    <ScrollView>
      <FlatList
        data={friendsFood}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {item.name}
            </Text>
            {item.foods.map((food, index) => (
              <Pressable
                key={index}
                style={styles.foodItem}
                onPress={() => handleDetails(food)}
              >
                <Text style={styles.foodTitle}>{food.title}</Text>
              </Pressable>
            ))}
          </View>
        )}
      />
    </ScrollView>
  );
};

export default SharedRecipes;
const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#DEE791",
    justifyContent: "center",
    alignItems: "center",
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
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
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
