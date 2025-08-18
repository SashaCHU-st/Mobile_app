import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import RenderHTML from "react-native-render-html";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Linking } from "react-native";
import { useState, useCallback } from "react";
import { API_URL } from "../config";
import AddComments from "../components/AddComments";
import { oldComments } from "../types/types";
import Comments from "../components/Comments";

const { width } = Dimensions.get("window");

const Summary = () => {
  const [error, setError] = useState("");
  const params = useLocalSearchParams();
  const [comments, setComments] = useState("");
  const [oldComment, setOldComment] = useState<oldComments[]>([]);
  const recipeString = Array.isArray(params.recipe)
    ? params.recipe[0]
    : params.recipe;
  const recipe = recipeString ? JSON.parse(recipeString) : null;

  const handleOldComment = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const results = await fetch(`${API_URL}/oldComments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
        }),
      });
      const data = await results.json();
      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setOldComment(data.comments);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    }
  };
  useFocusEffect(
    useCallback(() => {
      handleOldComment(recipe.id);
    }, [])
  );
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
        <AddComments
          comments={comments}
          setComments={setComments}
          id={recipe.id}
          onAdded={() => handleOldComment(recipe.id)}
        />
        <Comments oldComment={oldComment} />
      </View>
    </ScrollView>
  );
};

export default Summary;

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
  emptyText: {
    marginTop: 50,
    fontSize: 18,
    color: "#999",
    textAlign: "center",
  },
});
