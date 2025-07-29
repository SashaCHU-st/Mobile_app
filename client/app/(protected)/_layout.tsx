import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../context/Authcontext";
import { View, ActivityIndicator } from "react-native";

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

  return <Slot />;
}
