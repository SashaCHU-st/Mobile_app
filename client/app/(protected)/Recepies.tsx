import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  Dimensions,
} from "react-native";
import { Food } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API, API_KEY } from "@env";
import FoodCards from "../components/FoodCards";

const size = Dimensions.get("window").width * 0.1;

const Recepies = () => {
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
      <FoodCards foods={foods} />
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
});
