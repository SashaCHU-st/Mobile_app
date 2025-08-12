import { View} from "react-native";
import React from "react";
import Auth from "../components/Auth";
import Header from "../components/Header";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/Authcontext";

const Home = () => {
  const { isAuthorized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthorized) {
      router.push("/(protected)/UserPage");
    }
  }, [isAuthorized]);
  return (
    <View>
      <Header />
      <Auth />
    </View>
  );
};

export default Home;
