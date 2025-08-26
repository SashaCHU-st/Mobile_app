import {
  View,
  Pressable,
  Text,
  FlatList,
  Image,
  StyleSheet
} from "react-native";
import dog from "../../../assets/images/dog.jpg";
import { useRouter } from "expo-router";
import { Food } from "../../types/types";


const FoodCards = ({ foods }: { foods: Food[] })=> {
  const router = useRouter();
  const handleMoreInfo = async (recipe: Food) => {
    router.push({
      pathname: "/recipe-details/RecipeDetails",
      params: { recipe: JSON.stringify(recipe) },
    });
  };

  return (
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
            style={styles.foodImage}
            resizeMode="cover"
          />
          <Pressable onPress={() => handleMoreInfo(food)}>
            <Text style={styles.foodTitle}>
             {food.title}
            </Text>
          </Pressable>
        </View>
      )}
    />
  );
};

export default FoodCards;
const styles = StyleSheet.create({
  foodImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
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
