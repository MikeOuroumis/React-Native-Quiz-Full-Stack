import { View, Text, StyleSheet, Button } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonComponent from "../components/ButtonComponent";
import LoginScreen from "./LoginScreen";

export default function StartingScreen(props) {
  const [userData, setUserData] = useState({});
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    retrieveData();
  }, []);

  async function retrieveData() {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        // We have data!!
        setUserData(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  async function logOutHandler() {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.setItem("loggedIn", JSON.stringify(false));
      setUserData({});
      props.navigation.replace("LoginScreen");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.globalView}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Hello {userData.userName}, welcome to Knowar 🥸⚔️
        </Text>

        <ButtonComponent title="Single Player" />
        <ButtonComponent
          style={{ marginVertical: 8 }}
          title="Multi Player"
          onPress={() =>
            props.navigation.navigate("MultiplayerStarterScreen", {
              logout: logout,
            })
          }
        />
        <ButtonComponent
          title="Logout"
          onPress={async () => await logOutHandler()}
        />
      </View>
    </View>
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
  label: {
    color: "#2563eb",
    textAlign: "center",
    padding: 5,
    marginVertical: 8,
    fontWeight: "400",
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
