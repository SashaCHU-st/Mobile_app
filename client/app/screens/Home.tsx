import { View, Text } from "react-native";
import React from "react";
import Auth from "../components/Auth";
import Header from "../components/Header";

const Home = () => {
  return (
    <View>
      <Header />
      <Auth />
    </View>
  );
};

export default Home;
