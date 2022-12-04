import { View, Button, Text, StyleSheet } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

export default function GameScreen(props) {
  let [results, setResults] = useState([]);

  useEffect(() => {
    console.log("index passed in Game Screen is: ", props.route.params.index);
    retrieveData(props.route.params.index);
  }, []);

  async function retrieveData(categoryId) {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=easy&type=multiple`
      );
      const code = response.data.response_code;

      //manual error if promise is rejected..
      if (code !== 0) {
        const err =
          code === 1
            ? " No Results. The API doesn't have enough questions for your query."
            : code === 2
            ? "Invalid Parameter. Arguements passed in aren't valid."
            : code === 3
            ? "Token Not Found. Session Token does not exist."
            : "Token Empty Session. Token has returned all possible questions for the specified query. Resetting the Token is necessary.";

        throw new Error(`${err}`);
      } else {
        const data = await response.data;
        results = data.results;
        // creating the all_answers array
        for (let result of results) {
          let allAnswers = [...result.incorrect_answers, result.correct_answer];
          // shuffling the answers in the array with Durstenfeld shuffle method
          for (let i = allAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
          }
          //adding allAnswers in the results
          result.all_answers = allAnswers;
        }

        console.log(results);
        setResults(results);

        // setIsFetching(false);
        return results;
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Screen</Text>
      <Text style={styles.title}>Category: {props.route.params.category}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

//
