import { StatusBar } from "expo-status-bar";
import React from "react";
// import * as React from "react";
import { useEffect, useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StartingScreen from "./screens/StartingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MultiplayerStarterScreen from "./screens/MultiplayerStarterScreen";
import GameScreen from "./screens/GameScreen";
import LoadingScreen from "./screens/LoadingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import COLORS from "./constants/colors";

import "react-native-gesture-handler";

<script src="http://192.168.1.55:8097"></script>;
let data = "";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AuthenticatedStack() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.lighterGrey },
        headerTintColor: COLORS.primaryBlack,
        headerTitleStyle: { fontWeight: "bold" },
        headerTitleAlign: "center",
        drawerActiveBackgroundColor: COLORS.lightBlue,
        drawerActiveTintColor: COLORS.primaryBlack,
        drawerStyle: { backgroundColor: COLORS.lightGrey },
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Logout"
              onPress={() => {
                logOutHandler();
                props.navigation.navigate("LoginScreen");
              }}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="Home"
        component={StartingScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={20} />
          ),
        }}
      />
      <Drawer.Screen
        name="Multiplayer"
        component={MultiplayerStarterScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons name={focused ? "people" : "people-outline"} size={20} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function logOutHandler() {
  AsyncStorage.removeItem("token");
  AsyncStorage.setItem("loggedIn", JSON.stringify(false));
  console.log("logged out");
}

export default function App(props) {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    retrieveData();
  }, []);

  async function retrieveData() {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        // We have data!!
        data = JSON.parse(value);
        setIsLogged(true);
        setIsLoading(false);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  // loading screen while checking if user is logged in
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="AuthenticatedStack"
          component={AuthenticatedStack}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
