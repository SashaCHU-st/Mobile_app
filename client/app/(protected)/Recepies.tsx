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
import DropDownPicker from "react-native-dropdown-picker";

const size = Dimensions.get("window").width * 0.1;

const Recepies = () => {
  const [search, setSearch] = useState("");
  const [foods, setFood] = useState<Food[]>([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [diet, setDiet] = useState("");
  const [intolerance, setIntolerance] = useState("");
  const [dietItems, setDietItems] = useState([
    { label: "Gluten Free", value: "Gluten Free" },
    { label: "Ketogenic", value: "Ketogenic" },
    { label: "Vegetarian", value: "Vegetarian" },
    { label: "Lacto-Vegetarian", value: "Lacto-Vegetarian" },
    { label: "Ovo-Vegetarian", value: "Ovo-Vegetarian" },
    { label: "Vegan", value: "Vegan" },
    { label: "Pescetarian", value: "Pescetarian" },
    { label: "Paleo", value: "Paleo" },
    { label: "Primal", value: "Primal" },
    { label: "Low FODMAP", value: "Low FODMAP" },
    { label: "Whole30", value: "Whole30" },
  ]);
  const [intoleranceItems, setIntoleranceItems] = useState([
    { label: "Dairy", value: "Dairy" },
    { label: "Egg", value: "Egg" },
    { label: "Gluten", value: "Gluten" },
    { label: "Grain", value: "Grain" },
    { label: "Peanut", value: "Peanut" },
    { label: "Seafood", value: "Seafood" },
    { label: "Sesame", value: "Sesame" },
    { label: "Shellfish", value: "Shellfish" },
    { label: "Soy", value: "Soy" },
    { label: "Sulfite", value: "Sulfite" },
    { label: "Tree Nut", value: "Tree Nut" },
    { label: "Wheat", value: "Wheat" },
  ]);

  const handleSearch = async () => {

    let url = `${API}${encodeURIComponent(search)}&addRecipeInformation=true`;

    if (diet) {
      url += `&diet=${diet}`;
    }

    if (intolerance) {
      url += `&intolerances=${intolerance}`;
    }

    url += API_KEY;

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
      <View style={[styles.container2, { zIndex: 1000 }]}>
        <View style={{ zIndex: 2000, marginBottom: 10 }}>
          <Text>Diet</Text>
          <DropDownPicker
            open={open}
            value={diet}
            items={dietItems}
            setOpen={setOpen}
            setValue={(value) => setDiet(value)}
            setItems={setDietItems}
          />
        </View>
        <View style={{ zIndex: 1000 }}>
          <Text>Intolerance</Text>
          <DropDownPicker
            open={open2}
            value={intolerance}
            items={intoleranceItems}
            setOpen={setOpen2}
            setValue={setIntolerance}
            setItems={setIntoleranceItems}
          />
        </View>
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
  container2: {
 flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 12,
    backgroundColor: "#f7f7f7",
    padding: 3,
    flexWrap: "wrap",
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
