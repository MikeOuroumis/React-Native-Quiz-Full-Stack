import { View, Button, Text, StyleSheet, Pressable } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { EncodeMode, decode } from "html-entities";
import ButtonComponent from "../components/ButtonComponent";
import socket from "../util/socket";
import LoadingScreen from "./LoadingScreen";

export default function JoinGameScreen(props) {
  let [results, setResults] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  let screen = null;
  let clean_up = false;

  useEffect(() => {
    return () => {
      console.log("clean up");
      socket.emit("join_game", false);
    };
  }, []);

  useEffect(() => {
    setResults(null);
    // console.log("clean up when starting");
  }, []);

  useEffect(() => {
    //on socket clean up

    socket.on("clean_up_questions", (data) => {
      // console.log(data);
      console.log("creator of the game cleaned up");
      setResults(data);
    });
    if (!results) {
      console.log("trying to join");
      socket.emit("give_me_questions");
      socket.on("receive_questions", (data) => {
        socket.emit("join_game", true);
        setResults(data);
      });
    }
  }, [socket]);
  if (!results) {
    console.log("trying to join");
    socket.emit("give_me_questions");
    socket.on("receive_questions", (data) => {
      setResults(data);
      socket.emit("join_game", true);
    });
  }

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.title}>{JSON.stringify(results)}</Text>
  //   </View>
  // );

  if (results !== null && results !== undefined) {
    const answers = results[currentQuestion]?.all_answers.map((result) => {
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
          {decode(results[currentQuestion]?.question)}
        </Text>
        {answers}
        <Button
          title="Next Question"
          onPress={() => console.log("Next Question Clicked")}
        />
      </View>
    );
    return screen;
  }
  if (results === null) {
    return (
      <LoadingScreen text="Waiting for your opponent to create the game..." />
    );
  }
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
  answer: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  answersPressable: {
    maxHeight: 50,
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
