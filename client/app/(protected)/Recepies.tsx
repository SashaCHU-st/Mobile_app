import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import dog from "../../assets/images/dog.jpg";
import { useRouter } from "expo-router";
import { Food } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API, API_KEY } from "@env";

const { width } = Dimensions.get("window");
const size = Dimensions.get("window").width * 0.1;

const Recepies = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [foods, setFood] = useState<Food[]>([]);

  const handleSearch = async () => {
    const url = `${API}${encodeURIComponent(search)}&addRecipeInformation=true&number=10${API_KEY}`;

    const token = await AsyncStorage.getItem("token");
    const results = await fetch(`${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await results.json();
    console.log("data=>", data.results);
    setFood(data.results);
  };

  const handleMoreInfo = async (recipe: Food) => {
    // console.log("JJJJ", id);
    router.push({
      pathname: "/recipe-details/RecipeDetails",
      params: { recipe: JSON.stringify(recipe) },
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter food"
          value={search}
          onChangeText={setSearch}
        />
        <Pressable style={styles.button} onPress={handleSearch}>
          <Text>Search</Text>
        </Pressable>
      </View>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No food found</Text>}
        renderItem={({ item: food }) => (
          <View style={styles.foodItem}>
            <Image
              source={food.image ? { uri: food.image } : dog}
              style={styles.userImage}
              resizeMode="cover"
            />
            <Pressable onPress={() => handleMoreInfo(food)}>
              <Text style={styles.foodTitle}>
                {food.id} {food.title}
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default Recepies;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: "#f7f7f7",
  },
  searchRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginVertical: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
  },
  button: {
    width: 120,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#DEE791",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
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
  foodTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  emptyText: {
    marginTop: 50,
    fontSize: 18,
    color: "#999",
    textAlign: "center",
  },
});
