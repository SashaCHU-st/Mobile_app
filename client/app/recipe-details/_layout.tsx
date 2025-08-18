import { Stack } from "expo-router";

export default function RecipeDetailsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#B2B0E8" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Recipe Details" }} />
    </Stack>
  );
}
