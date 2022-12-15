import { View, Text, StyleSheet, Button } from "react-native";
import { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonComponent from "../components/ButtonComponent";
import LoginScreen from "./LoginScreen";
import LoadingScreen from "./LoadingScreen";
import COLORS from "../constants/colors";
import AuthContextProvider, { AuthContext } from "../store/auth-context";

export default function StartingScreen(props) {
  const [logout, setLogout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    retrieveData();
  }, []);

  async function retrieveData() {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        // We have data!!
        setLoading(false);
        const data = JSON.parse(value);
        authCtx.authenticate(data.token, data.email, data.userName);
      } else {
        setLoading(false);
        props.navigation.navigate("LoginScreen");
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
      authCtx.logout();
      props.navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <AuthContextProvider>
      <View style={styles.globalView}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Hello {authCtx.userName}, welcome to Knowar 🥸⚔️
          </Text>
          <Text style={styles.label}>Choose an option</Text>
          <Text style={styles.label}>{authCtx.email}</Text>

          <ButtonComponent
            title="Single Player"
            onPress={() => handlePress()}
          />
          <ButtonComponent
            style={{ marginVertical: 8 }}
            title="Multi Player"
            onPress={() =>
              props.navigation.navigate("MultiplayerStarterScreen")
            }
          />
          <ButtonComponent
            title="Logout"
            onPress={async () => await logOutHandler()}
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
