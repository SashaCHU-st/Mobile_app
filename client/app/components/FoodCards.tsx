import {
  View,
  Pressable,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet
} from "react-native";
import dog from "../../assets/images/dog.jpg";
import { useRouter } from "expo-router";
import { Food } from "../types/types";

const { width } = Dimensions.get("window");

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
              {food.id} {food.title}
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
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginVertical: 20,
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
