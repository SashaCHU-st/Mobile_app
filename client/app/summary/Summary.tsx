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
import { useState,useCallback } from "react";
import { API_URL } from "../config";
import Comments from "../components/Comments";
import { oldComments } from "../types/types";

const size = Dimensions.get("window").width * 0.1;
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
    <ScrollView>
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
      <Comments comments={comments} setComments={setComments} id={recipe.id} />
      <Text>Comments:</Text>
      {/* <View style={styles.foodItem}>
        <Pressable onPress={() => handleOldComment(recipe.id)}>
          <Text>Get comments</Text>
        </Pressable>
      </View> */}
      <FlatList
        data={oldComment}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No food found</Text>}
        renderItem={({ item: comment }) => (
          <View style={styles.foodItem}>
            <Text>{comment.comment}</Text>
            <Text>
              {new Date(comment.time).toLocaleTimeString("en-GB", {
                timeZone: "Europe/Helsinki",
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        )}
      />
    </ScrollView>
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
    flexDirection: "row",
    justifyContent: "space-between",
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
