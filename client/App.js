import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
// import * as React from "react";
import { useEffect, useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StartingScreen from "./screens/StartingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MultiplayerStarterScreen from "./screens/MultiplayerStarterScreen";
import GameScreen from "./screens/GameScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import "react-native-gesture-handler";

<script src="http://192.168.1.55:8097"></script>;
let data = "";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function DrawerNested() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          // backgroundColor: "000",
          zIndex: 100,
        },
      }}
    >
      <Drawer.Screen
        name="StartingScreen"
        component={StartingScreen}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App(props) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    retrieveData();
  }, []);

  async function retrieveData() {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        // We have data!!
        data = JSON.parse(value);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="DrawerNested" component={DrawerNested} />
        <Stack.Screen name="StartingScreen" component={StartingScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="MultiplayerStarterScreen"
          component={MultiplayerStarterScreen}
        />
        <Stack.Screen name="GameScreen" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
