import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Linking } from "react-native";

import RenderHTML from "react-native-render-html";
const width = Dimensions.get("window").width;
const RecipeDetails = () => {
const params = useLocalSearchParams();
const recipeString = Array.isArray(params.recipe) ? params.recipe[0] : params.recipe;
const recipe = recipeString ? JSON.parse(recipeString) : null;
  return (
    <ScrollView style={{ padding: 15 }}>
      <RenderHTML
        contentWidth={width}
        source={{ html: recipe.summary }}
        tagsStyles={{
          b: { fontWeight: "bold", color: "#d9534f" },
          a: { color: "#337ab7", textDecorationLine: "underline" },
          p: { marginBottom: 10, fontSize: 16, lineHeight: 22 },
        }}
        renderersProps={{
          a: {
            onPress: (_, href) => {
              if (href) Linking.openURL(href);
            },
          },
        }}
      />
    </ScrollView>
  );
};

export default RecipeDetails;
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
