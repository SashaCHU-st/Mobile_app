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
import { API_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import dog from "../../assets/images/dog.jpg";
import { FriendsFood } from "../types/types";
const size = Dimensions.get("window").width * 0.1;


const SharedRecipes = () => {
      const [error, setError] = useState<string>("");
      const [friendsFood, setFriendsFood] = useState<FriendsFood[]>([])

    const checkFriendsfav = async () =>
    {
        try{
            const myId = await AsyncStorage.getItem("id");
            console.log("KKK=>", myId)
            console.log(typeof myId)
        const token = await AsyncStorage.getItem("token");
        const results = await fetch(`${API_URL}/friendsFavorites`,
        {
            method:"POST",
            headers:
            {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
             body: JSON.stringify({
          userId: Number(myId),
        })  });
      const data = await results.json();
      console.log("GGGG=>", data.checkFriendsFav)
      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setFriendsFood(data.checkFriendsFav)
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    }
    }
  return (
    <View>
        <Pressable style={styles.button}onPress={checkFriendsfav}>
            <Text>
                Check Friend fav
            </Text>
        </Pressable>
        <FlatList
            data={friendsFood}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={{ padding: 10 }}
            ListEmptyComponent={<Text style={styles.emptyText}>No food found</Text>}
            renderItem={({ item: food }) => (
                <View style={styles.foodItem}>
                    <Text>{food.name}</Text>
                <Image
                    source={food.image ? { uri: food.image } : dog}
                    style={styles.foodImage}
                    resizeMode="cover"
                />
                {/* <Pressable onPress={() => handleMoreInfo(food)}> */}
                    <Text style={styles.foodTitle}>
                    {food.title}
                    </Text>

                </View>
            )}
            />
    </View>
  )
}

export default SharedRecipes
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
    alignItems: "center",
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
