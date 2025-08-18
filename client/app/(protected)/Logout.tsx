import { View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/Authcontext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const Logout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/");  
  };

    useFocusEffect(
      useCallback(() => {
        handleLogout();
      }, [])
    );
  return (
    <View>
    </View>
  );
};

export default Logout;
