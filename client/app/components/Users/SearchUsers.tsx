import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { size } from "../../utils/size";


const SearchUsers = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (text: string) => void;
}) => {
  return (
    <View style={styles.searchRow}>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={value}
        onChangeText={onChange}
      />
      <Pressable style={styles.button} onPress={() => onChange(value)}>
        <Text>Search</Text>
      </Pressable>
    </View>
  );
};


export default SearchUsers;

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  button: {
    width: 120,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#7A85C1",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
  },
});
