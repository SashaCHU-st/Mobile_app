import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";
import { useState } from "react";
import { API_URL } from "../config";

const size = Dimensions.get("window").width * 0.1;
const { width } = Dimensions.get("window");

const Summary = () => {
  const params = useLocalSearchParams();
  const [comments, setComments] = useState("");
  const recipeString = Array.isArray(params.recipe)
    ? params.recipe[0]
    : params.recipe;
  const recipe = recipeString ? JSON.parse(recipeString) : null;

  const handleAddComment = async (comments: string, id: number) => {
    const myId = await AsyncStorage.getItem("id");
    const token = await AsyncStorage.getItem("token");
    const results = await fetch(`${API_URL}/addComments`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: Number(myId),
        comments,
        id,
      }),
    });
    const data = await results.json();
    if (!results.ok) {
      throw new Error(data.message || "Something went wrong");
    }
  };
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

      <TextInput
        style={styles.input}
        placeholder="My comments"
        value={comments}
        onChangeText={(text) => {
          setComments(text);
        }}
      />
      <Pressable
        style={styles.button}
        onPress={() => handleAddComment(comments, recipe.id)}
      >
        <Text>Add comments</Text>
      </Pressable>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
