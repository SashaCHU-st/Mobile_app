import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../context/Authcontext";
import { View, ActivityIndicator } from "react-native";
import { Drawer } from "expo-router/drawer";

export default function ProtectedLayout() {
  const { isAuthorized, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthorized) {
      router.replace("/");
    }
  }, [isAuthorized, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Drawer
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#ec7438ff",
        },
        drawerLabelStyle: {
          color: "white", 
        },
        headerStyle: {
          backgroundColor: "#ec7438ff", 
        },
        headerTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="UserPage"
        options={{ drawerLabel: "👤 My Page", title: "My Page" }}
      />
      <Drawer.Screen
        name="ShowFriends"
        options={{ drawerLabel: "🧑‍🤝‍🧑 Friends", title: "Friends" }}
      />
      <Drawer.Screen
        name="ShowUsers"
        options={{ drawerLabel: "🧑‍🤝‍🧑 Users", title: "Users" }}
      />
      <Drawer.Screen
        name="Logout"
        options={{ drawerLabel: "Logout", title: "Logout" }}
      />
        <Drawer.Screen
        name="EditProfile"
        options={{ drawerLabel: "⚙️ Edit Profile", title: "Edit Profile" }}
      />
    </Drawer>
  );
}
