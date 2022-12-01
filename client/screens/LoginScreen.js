import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";

export default function LoginScreen(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let [loggedIn, setLoggedIn] = useState(false);

  function handlePress() {
    fetch("http://192.168.1.55:5000/login-user", {
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
          alert("login successful");
          setLoggedIn(true);
          console.log(data.data);
          AsyncStorage.setItem("token", JSON.stringify(data.data));
          //go to userDetailsScreen
          props.navigation.navigate("UserDetailsScreen");

          // console.log(data);
          // const _storeData = async () => {
          //   try {
          //     await AsyncStorage.setItem("token", data.data);
          //     window.location.href = "./UserDetailsScreen.js";
          //   } catch {}
          //   _storeData();
          // };
        }
      })
      .catch((err) => console.error(err));
    // props.isLoggedIn(loggedIn);
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
        <Button title="Login" onPress={handlePress} />
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
// const [user, setUser] = React.useState({
//   email: "",
//   password: "",
// });
// const [errorMessages, setErrorMessages] = React.useState({});
// let [usersArray, setUsersArray] = useState([]);
// let [userExists, setUserExists] = useState(false);
// let userIndex = null;
// let curUserEmail;
// let curUserPassword;
// useEffect(() => {
//   //logic for getting a value from local storage stored under the key 'key'
//   const data = localStorage.getItem("usersArray");
//   //if data is null don't run the next line...
//   data && setUsersArray(JSON.parse(data));
//   if (data) usersArray = JSON.parse(data);
// }, []);
// function handleChange(event) {
//   setUser((prevUser) => ({
//     ...prevUser,
//     [event.target.name]: event.target.value,
//   }));
// }
// function handleSubmit(event) {
//   event.preventDefault();
//   setErrorMessages(validation());
//   //Does user exist?
//   for (const item of usersArray) {
//     if (user.email === item.email) {
//       setUserExists(true);
//       userExists = true;
//       //index to match the email and password later...
//       console.log(`item: ${usersArray.indexOf(item)}`);
//       userIndex = usersArray.indexOf(item);
//       console.log(usersArray[userIndex].email);
//       break;
//     } else {
//       setUserExists(false);
//       userExists = false;
//     }
//   }
//   curUserEmail = usersArray[userIndex].email;
//   curUserPassword = usersArray[userIndex].password;
//   //if the password is correct then login...
//   if (curUserPassword === event.target.password.value) {
//     console.log("logged in");
//     //here must follow the login code...
//     //pass user data to App.js
//     //pass userIndex to App.js
//     const currentUser = usersArray[userIndex];
//     //how to pass currentUser to App.js
//     //sends the user index to App.js
//     props.setUserIndex(userIndex);
//     return currentUser;
//   }
//   if (userExists) console.log("user exists");
//   else console.log("user doesn't exist");
// }
// function validation() {
//   const errors = {};
//   if (user.email.trim() === "") errors.email = "Please fill in the email";
//   if (user.password.trim() === "")
//     errors.password = "Please fill in the password";
//   return errors;
// }
// return (
//   <View className="quiz-container">
//     <Text style={{ color: "#0c88fb" }}>Login</Text>
//     <View>
//       {/* <form onSubmit={handleSubmit}> */}
//       <label style={{ color: "white" }}>Email</label>
//       <input
//         id="email"
//         placeholder="email"
//         onChange={handleChange}
//         className="form-control"
//         name="email"
//         value={user.email}
//       ></input>
//       {errorMessages.email && (
//         <div className="errorMessages">{errorMessages.email}</div>
//       )}
//       <label style={{ color: "white" }}>Password</label>
//       <input
//         type="password"
//         id="password"
//         placeholder="password"
//         onChange={handleChange}
//         className="form-control"
//         name="password"
//         value={user.password}
//       ></input>
//       {errorMessages.password && (
//         <Text className="errorMessages">{errorMessages.password}</Text>
//       )}
//       <Button title="Submit" />
//     </View>
//     {/* </form> */}
//     <div>
//       New user? Register{" "}
//       <button
//         className="btn btn-link"
//         onClick={props.registerLogilToggle}
//         style={{ padding: "0", marginTop: "-5px" }}
//       >
//         here
//       </button>
//     </div>
//   </View>
// );
// }
