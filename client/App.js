import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState, useEffect, RingLoader } from "react";
// import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import UserDetailsScreen from "./screens/UserDetailsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

<script src="http://192.168.1.55:8097"></script>;
let data = "";
const Stack = createNativeStackNavigator();

export default function App() {
  const [loginScreen, setLoginScreen] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  function loggedInFunction(e) {
    // console.log(e);
    setLoggedIn(e);
  }

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
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="UserDetailsScreen"
            component={UserDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
