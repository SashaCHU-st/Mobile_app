import { Stack } from "expo-router";

export default function RecipeDetailsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#ec7438ff" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Summary" }} />
    </Stack>
  );
}
