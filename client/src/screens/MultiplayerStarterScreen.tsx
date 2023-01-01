import { View, Text, StyleSheet, Option, Pressable } from "react-native";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import CategoryBox from "../components/CategoryBox";
import SelectDropdown from "react-native-select-dropdown";
import { SelectList } from "react-native-dropdown-select-list";
import socket from "../util/socket";
import { Ionicons } from "@expo/vector-icons";
import DropdownComponent from "../components/DropdownComponent";

export default function MultiplayerStarterScreen(props) {
  const [selected, setSelected] = useState("");
  const [createGame, setCreateGame] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await axios.get("https://opentdb.com/api_category.php");

      const data = await response.data;
      const categories = data.trivia_categories;

      // trim Entertainment: and Science: from the category names
      categories.forEach((element) => {
        element.name = element.name.replace("Entertainment: ", "");
        element.name = element.name.replace("Science: ", "");
      });

      setCategories(categories);
      // setFetchingCategories(false);
    } catch (err) {
      alert(err);
    }
  }
  const categoryNames = categories.map((element) => {
    return element.name;
  });

  function createGameHandler() {
    setCreateGame(true);
  }

  return (
    <>
      <View style={styles.container}>
        {!createGame && (
          <ButtonComponent
            title="Create Game"
            onPress={() => {
              createGameHandler();
            }}
          ></ButtonComponent>
        )}
        {!createGame && <ButtonComponent title="Join Game"></ButtonComponent>}
        {createGame && (
          <Text style={styles.title}>Choose a category to start the game!</Text>
        )}
        {createGame && (
          <DropdownComponent
            data={categoryNames}
            defaultValue={categoryNames}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setSelected(selectedItem);
            }}
          />
        )}

        {createGame && (
          <ButtonComponent
            title="Start Game"
            onPress={() => {
              console.log(categoryNames.indexOf(selected));
              props.navigation.navigate("GameScreen", {
                index: categoryNames.indexOf(selected),
              });
            }}
          />
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    padding: 20,
    color: "#fff",
    marginBottom: 70,
    fontWeight: "400",
    fontSize: 25,
  },
});
