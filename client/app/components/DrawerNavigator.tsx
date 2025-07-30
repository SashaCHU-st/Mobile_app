import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ShowUsers from "../(protected)/ShowUsers";
import ShowFriends from "../(protected)/ShowFriends";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Users">
      <Drawer.Screen name="Users" component={ShowUsers} />
      <Drawer.Screen name="Friends" component={ShowFriends} />
    </Drawer.Navigator>
  );
}
