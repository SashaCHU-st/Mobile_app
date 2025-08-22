import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { OldCommentsProps } from "../../types/types";
const { width } = Dimensions.get("window");

const Comments = ({oldComment}:OldCommentsProps) => {
  return (
    <View>
      <Text>Comments:</Text>
      <FlatList
        data={oldComment}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No food found</Text>}
        renderItem={({ item: comment }) => (
          <View style={styles.commentItem}>
            <Text>{comment.name}:</Text>
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
    </View>
  );
};

export default Comments;
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
  commentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: "#f5ededff",
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
});
