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
import RenderHTML from "react-native-render-html";
import { useLocalSearchParams } from "expo-router";
import { Linking } from "react-native";

const size = Dimensions.get("window").width * 0.1;
const { width } = Dimensions.get("window");

const Summary = () => {
      const params = useLocalSearchParams();
      const recipeString = Array.isArray(params.recipe)
        ? params.recipe[0]
        : params.recipe;
      const recipe = recipeString ? JSON.parse(recipeString) : null;
  return (
    <View>
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
  );
};

export default Summary;

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#DEE791",
    justifyContent: "center",
    alignItems: "center",
  },
  baseText: {
    fontSize: 15,
    lineHeight: 20,
  },
  emptyText: {
    marginTop: 50,
    fontSize: 18,
    color: "#999",
    textAlign: "center",
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
