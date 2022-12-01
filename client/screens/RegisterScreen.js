import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import { useEffect, useState } from "react";

export default function RegisterScreen(props) {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [userName, setUserName] = useState(null);

  function handlePress() {
    fetch("http://192.168.1.55:5000/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application.json",
        "Access-Control-Allow-Origin": "*",
      },

      body: JSON.stringify({
        userName,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "userRegister"))
      .catch((err) => console.error(err));
  }

  return (
    <View style={styles.globalView}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <Input
          placeholder="Username"
          onChangeText={(newUserName) => setUserName(newUserName)}
        />

        <Input
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(newEmail) => setEmail(newEmail)}
        />

        <Input
          placeholder="Password"
          keyboardType="default"
          autoCapitalize={"none"}
          secureTextEntry={true}
          onChangeText={(newPassword) => setPassword(newPassword)}
        />
        <Button title="Register" onPress={handlePress} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Do you already have an account? Login{" "}
          </Text>
          <Text
            style={{
              color: "#2563eb",
            }}
            onPress={props.registerLoginChange}
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
