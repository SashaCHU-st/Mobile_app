import {
  View,
  ScrollView,
  StyleSheet,
  Image,
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
import { size } from "../utils/size";
import dog from "../../assets/images/dog.jpg";

const SharedRecipes = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [friendsFood, setFriendsFood] = useState<
    { name: string; foods: { title: string; image: string }[] }[]
  >([]);

  const checkFriendsfav = async () => {
    try {
      const results = await fetch(`${API_URL}/friendsFavorites`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
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
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <FlatList
        data={friendsFood}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}
            >
              {item.name}'s favorites
            </Text>
            <FlatList
              data={item.foods}
              keyExtractor={(food, index) => `${item.name}-${index}`}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              renderItem={({ item: food }) => (
                <Pressable
                  style={styles.foodCard}
                  onPress={() => handleDetails(food)}
                >
                  <Image
                    source={food.image ? { uri: food.image } : dog}
                    style={styles.foodImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.foodTitle} numberOfLines={2}>
                    {food.title}
                  </Text>
                </Pressable>
              )}
            />
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
    backgroundColor: "#7A85C1",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
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
  foodCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 6,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  foodImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  foodTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});
