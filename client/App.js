import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useEffect } from "react";
import LoginScreen from "./screens/LoginScreen";
import UserDetailsScreen from "./screens/UserDetailsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartingScreen from "./screens/StartingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MultiplayerStarterScreen from "./screens/MultiplayerStarterScreen";
import GameScreen from "./screens/GameScreen";

<script src="http://192.168.1.55:8097"></script>;
let data = "";
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    retrieveData();
  }, []);

  async function retrieveData() {
    // data = await AsyncStorage.getItem("token");
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
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="UserDetailsScreen"
            component={UserDetailsScreen}
          />
          <Stack.Screen name="StartingScreen" component={StartingScreen} />
          <Stack.Screen
            name="MultiplayerStarterScreen"
            component={MultiplayerStarterScreen}
          />
          <Stack.Screen name="GameScreen" component={GameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
