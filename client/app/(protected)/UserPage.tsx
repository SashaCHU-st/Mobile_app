import { useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/Authcontext";
import Logout from "../components/Logout";
import Header from "../components/Header"
import Users from "./Users";

export default function UserPage() {
  const { isAuthorized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthorized) {
      router.replace("/");
    }
    
  }, [isAuthorized]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <View>
      <Header />
      <Users/>
      <Logout />
    </View>
  );
}
