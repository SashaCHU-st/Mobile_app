import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderHTML from "react-native-render-html";
import { useState } from "react";
import { API_URL } from "../config";

const size = Dimensions.get("window").width * 0.1;
const width = Dimensions.get("window").width;

const RecipeDetails = () => {
  const params = useLocalSearchParams();
  const recipeString = Array.isArray(params.recipe)
    ? params.recipe[0]
    : params.recipe;
  const recipe = recipeString ? JSON.parse(recipeString) : null;
  const [error, setError] = useState("");

  const handleAddFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const myId = await AsyncStorage.getItem("id");

      const results = await fetch(`${API_URL}/addFavorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: Number(myId),
          image:recipe.image,
          food_id:recipe.id,
          summary:recipe.summary,
          title:recipe.title
        }),
      });
      const data = await results.json();
      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      console.log("DAAAA=>",data)
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };
  return (
    <ScrollView style={{ padding: 15 }}>
      <View style={styles.container}>
        <Image
          source={recipe.image}
          style={styles.foodImage}
          resizeMode="cover"
        />
        {/* <Text>sss{recipe.food_id}</Text> */}
        <RenderHTML
          contentWidth={width}
          source={{ html: recipe.summary }}
          baseStyle={styles.baseText}
          tagsStyles={{
            b: { fontWeight: "bold", color: "#000000ff" },
            a: { color: "#337ab7", textDecorationLine: "underline" },
          }}
          defaultTextProps={{ selectable: true }}
          renderersProps={{
            a: {
              onPress: (_, href) => {
                if (href) Linking.openURL(href);
              },
            },
          }}
        />
      </View>
      <Pressable style={styles.button} onPress={handleAddFavorite}>
        <Text>Add to favorite</Text>
      </Pressable>
    </ScrollView>
  );
};

export default RecipeDetails;
const styles = StyleSheet.create({
  baseText: {
    fontSize: 15,
    lineHeight: 20,
  },
  button: {
    width: 120,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#DEE791",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
  },
  foodImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginVertical: 20,
  },
});
