import { View, Button, Text, StyleSheet, Pressable } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { EncodeMode, decode } from "html-entities";
import socket from "./../util/socket";
import LoadingScreen from "./LoadingScreen";
import COLORS from "../constants/colors";

export default function GameScreen(props) {
  let [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  let screen = null;
  let [objAnswers, setObjAnswers] = useState([]);
  const [opponentJoined, setOpponentJoined] = useState(false);

  useEffect(() => {
    return () => {
      console.log("clean up");
      socket.emit("clean_up");
    };
  }, []);

  useEffect(() => {
    //getting questions from trivia API by using the index of category
    getQuestionsFromAPI(props.route.params.index);
  }, []);

  useEffect(() => {
    if (!opponentJoined) {
      socket.on("opponent_joined", (data) => {
        setOpponentJoined(data);
        console.log("opponent joined", data);
      });
    }
    // prevented the infinite loop of sending questions to the server
    opponentJoined && socket.emit("send_questions", results);
  }, [socket]);

  async function getQuestionsFromAPI(categoryId) {
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
        setResults(results);
        socket.emit("send_questions", results);
        console.log(results);

        setIsFetching(false);
        return results;
      }
    } catch (err) {
      alert(err);
    }
  }

  function handlePressAnswer(clickedAnswer) {
    console.log(clickedAnswer);
    // socket.connect();

    socket.emit("send_answer", clickedAnswer);

    //check if the clicked answer is correct
    if (clickedAnswer === results[currentQuestion].correct_answer) {
      //emit the correct answer to the server and update the score of the player
    } else {
    }
  }

  if (!isFetching) {
    let currentAnswers = results[currentQuestion].all_answers;
    //refactor with useRef
    if (objAnswers.length < 4) {
      //creating an array of objects to set the clicked property
      for (let answer of currentAnswers) {
        let curObj = {};

        //getting index and set it as key
        const index = currentAnswers.indexOf(answer);
        curObj[index] = answer;

        objAnswers.push({ ...curObj });
      }
    }

    // create the currentQuestion Index and use it to results
    const answers = results[currentQuestion].all_answers.map((result) => {
      return (
        <Pressable
          title={result}
          onPress={() => handlePressAnswer(result)}
          style={({ pressed }) => [
            { opacity: pressed ? 0.75 : 1 },
            styles.answersPressable,
          ]}
          key={result}
        >
          <Text style={styles.answer}>{decode(result)}</Text>
        </Pressable>
      );
    });

    screen = (
      <View style={styles.container}>
        <Text style={styles.title}>
          {decode(results[currentQuestion].question)}
        </Text>
        {answers}
      </View>
    );
  }

  if (!opponentJoined) {
    return (
      <LoadingScreen text="Waiting for the opponent to join the game..." />
    );
  }
  return screen;
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
    borderColor: COLORS.primaryBlue,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 22,
    width: "80%",
    minHeight: 200,
    textAlignVertical: "center",
    padding: 10,
    backgroundColor: "#000",
    paddingVertical: 40,
    marginBottom: 20,
    textAlign: "center",

    fontWeight: "bold",
  },
  answer: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  answersPressable: {
    maxHeight: 200,

    borderRadius: 10,
    width: "80%",
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
