import { View, Text, StyleSheet, Button } from "react-native";
import { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonComponent from "../components/ButtonComponent";
import LoginScreen from "./LoginScreen";
import LoadingScreen from "./LoadingScreen";
import COLORS from "../../constants/colors";
import AuthContextProvider, { AuthContext } from "../store/auth-context";
import socket from "../util/socket";

export default function StartingScreen(props) {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("on_connect", "someone connected");
    });
  }, []);

  return (
    <AuthContextProvider>
      <View style={styles.globalView}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Hello {authCtx.userName}, welcome to Knowar 🥸⚔️
          </Text>
          <Text style={styles.text}>Choose an option...</Text>

          <ButtonComponent title="Single Player" />
          <ButtonComponent
            style={{ marginVertical: 8 }}
            title="Multi Player"
            onPress={() =>
              props.navigation.navigate("MultiplayerStarterScreen")
            }
          />
        </View>
      </View>
    </AuthContextProvider>
  );
}
const styles = StyleSheet.create({
  globalView: {
    flex: 1,
  },

  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "300",
    fontSize: 21,
  },

  title: {
    textAlign: "center",
    padding: 20,
    color: "#fff",
    marginBottom: 70,
    fontWeight: "400",
    fontSize: 25,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  image: {
    shadowColor: "aqua",
    shadowRadius: 20,
    width: 70,
    height: 70,
    alignSelf: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    elevation: 3,
    overlayColor: "aqua",
  },
});
