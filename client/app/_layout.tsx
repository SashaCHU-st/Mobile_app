import { Stack } from "expo-router";
import { AuthProvider } from "./context/Authcontext";

export default function Layout() {
  return (
    <AuthProvider>

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AuthProvider>
  );
}