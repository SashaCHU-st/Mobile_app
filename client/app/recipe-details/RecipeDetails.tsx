import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Linking } from "react-native";

import RenderHTML from "react-native-render-html";
const width = Dimensions.get("window").width;
const RecipeDetails = () => {
  const params = useLocalSearchParams();
  const recipeString = Array.isArray(params.recipe)
    ? params.recipe[0]
    : params.recipe;
  const recipe = recipeString ? JSON.parse(recipeString) : null;
  return (
    <ScrollView style={{ padding: 15 }}>
      <View style={styles.container}>
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
    </ScrollView>
  );
};

export default RecipeDetails;
const styles = StyleSheet.create({
  baseText: {
    fontSize: 15,
    lineHeight: 20,
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
});
