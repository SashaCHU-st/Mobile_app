import { StyleSheet, Text, View, Button } from "react-native";
import Auth from "./components/Auth";
import Header from "./components/Header";

export default function Index() {

  return (
    <View style={styles.container}>
      <Header/>
      <Auth />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});