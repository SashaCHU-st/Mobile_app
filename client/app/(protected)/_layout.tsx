import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext";
import { View, ActivityIndicator } from "react-native";
import { Drawer } from "expo-router/drawer";
import { notifications } from "../utils/api";

export default function ProtectedLayout() {
  const { isAuthorized, loading } = useAuth();
  const router = useRouter();
  const [pending, setPending] = useState(0);

  useEffect(() => {
    if (!loading && !isAuthorized) {
      router.replace("/");
    }
  }, [isAuthorized, loading]);

  useEffect(() => {
    notifications()
      .then(setPending)
      .catch((err) => console.error("Failed to fetch notifications:", err));
  }, []);

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
          backgroundColor: "#B2B0E8",
        },
        drawerLabelStyle: {
          color: "white",
        },
        headerStyle: {
          backgroundColor: "#B2B0E8",
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
        name="Recepies"
        options={{
          drawerLabel: "🥗 Search Recepies",
          title: "Search Recepies",
        }}
      />
      <Drawer.Screen
        name="MyRecepies"
        options={{ drawerLabel: "🥗 My Recepies", title: "My Recepies" }}
      />
      <Drawer.Screen
        name="SharedRecipes"
        options={{
          drawerLabel: "🥗 Shared Recipies",
          title: "Shared Recipies",
        }}
      />
      <Drawer.Screen
        name="EditProfile"
        options={{ drawerLabel: "⚙️ Edit Profile", title: "Edit Profile" }}
      />
      <Drawer.Screen
        name="Notifications"
        options={{
          drawerLabel:
            pending !== 0 ? `🔔Notification (${pending})` : `🔔Notification  `,
          title: "Notifications",
        }}
      />
      <Drawer.Screen
        name="Logout"
        options={{ drawerLabel: "Logout", title: "Logout" }}
      />
    </Drawer>
  );
}
