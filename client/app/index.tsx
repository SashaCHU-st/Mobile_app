import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import Home from "./screens/Home";

export default function Index() {
  const router = useRouter();

  return (
    <View>
      <Text>Welcome to Home Page</Text>
      <Home/>
    </View>
  );
}
