import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
} from "react-native";
import { size } from "../../utils/size";
import { MessageProps } from "../../types/types";
const { width } = Dimensions.get("window");


const Message = ({
  recivedMessages,
}: MessageProps) => {


  return (
    <View>
      <FlatList
        data={recivedMessages}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No messages yet found</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Text>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Message;
const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#7A85C1",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  emptyText: {
    marginTop: 50,
    fontSize: 18,
    color: "#999",
    textAlign: "center",
  },
  commentItem: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 5,
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
    maxWidth: "70%",
  },
});
