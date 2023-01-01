import { View, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../components/Input";
import { useState, useEffect, useContext } from "react";
import ButtonComponent from "../components/ButtonComponent";
import StartingScreen from "./StartingScreen";
import LoadingScreen from "./LoadingScreen";
import { AuthContext } from "../store/auth-context";

export default function LoginScreen(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    // checkIfLoggedIn();
    setIsLoading(false);
  }, []);

  async function checkIfLoggedIn() {
    try {
      //value is boolean
      const value = await AsyncStorage.getItem("loggedIn");
      if (value !== null) {
        // We have data!!
        // JSON.parse(value) === true &&
        //   props.navigation.navigate("AuthenticatedStack");
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  async function handlePress() {
    setIsLoading(true);
    await fetch("http://192.168.1.55:5000/login-user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application.json",
        "Access-Control-Allow-Origin": "*",
      },

      body: JSON.stringify({
        email: email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "User Logged In");
        if (data.status === "ok") {
          setLoggedIn(true);
          authCtx.authenticate(
            data.data.token,
            data.data.email,
            data.data.userName
          );

          AsyncStorage.setItem("token", JSON.stringify(data.data));

          //set loggedIn to true and use it in App.js to navigate to StartingScreen
          AsyncStorage.setItem("loggedIn", JSON.stringify(true));

          props.navigation.navigate("AuthenticatedStack");
          setIsLoading(false);
        } else {
          Alert.alert("Login Failed", "Invalid Credentials");
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }

  if (isLoading) {
    return <LoadingScreen text={"Logging In..."} />;
  }

  return (
    <View style={styles.globalView}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        {/* <Text style={styles.label}>Email</Text> */}
        <Input
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(newEmail) => setEmail(newEmail)}
        />

        {/* <Text style={styles.label}>Password</Text> */}
        <Input
          placeholder="Password"
          keyboardType="default"
          autoCapitalize={"none"}
          secureTextEntry={true}
          onChangeText={(newPassword) => setPassword(newPassword)}
        />
        <ButtonComponent title="Login" onPress={() => handlePress()} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            New user? Register{" "}
          </Text>
          <Text
            style={{
              color: "#2563eb",
            }}
            onPress={() => props.navigation.navigate("RegisterScreen")}
          >
            here
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  globalView: {
    flex: 1,
    // justifyContent: "center",
    // backgroundColor: "#2563eb",
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
    color: "#2563eb",
    marginBottom: 70,
    fontWeight: "300",
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
