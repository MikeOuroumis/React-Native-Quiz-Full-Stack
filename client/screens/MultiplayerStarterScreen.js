import { View, Text, StyleSheet, Option } from "react-native";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
// import SelectDropdown from "react-native-select-dropdown";
import ButtonComponent from "./../components/ButtonComponent";
import CategoryBox from "../components/CategoryBox";
import SelectDropdown from "react-native-select-dropdown";
import { SelectList } from "react-native-dropdown-select-list";

export default function MultiplayerStarterScreen(props) {
  const [selected, setSelected] = useState("");

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await axios.get("https://opentdb.com/api_category.php");

      const data = await response.data;
      console.log(data);
      const categories = data.trivia_categories;
      console.log(categories);

      setCategories(categories);
      // setFetchingCategories(false);
    } catch (err) {
      alert(err);
    }
  }
  //web socket connection
  const ws = new WebSocket("ws://192.168.1.55:5001");
  ws.onopen = () => {
    // connection opened
    ws.send("EEEELLLLLAAAAAA"); // send a message
  };
  const categoryNames = categories.map((element) => {
    return element.name;
  });

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Choose category to start the game!</Text>
        <SelectDropdown
          data={categoryNames}
          style={styles.selection}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            setSelected(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
        />
        <ButtonComponent
          title="Start Game"
          style={{ padding: 200 }}
          onPress={() => {
            console.log(selected);
            console.log(categoryNames.indexOf(selected));
            props.navigation.navigate("GameScreen", {
              index: categoryNames.indexOf(selected),
            });
          }}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    padding: 20,
    color: "#fff",
    marginBottom: 70,
    fontWeight: "400",
    fontSize: 25,
  },
  selection: {
    backgroundColor: "#fff000",
    color: "#fff",
    textAlign: "center",
  },
});
