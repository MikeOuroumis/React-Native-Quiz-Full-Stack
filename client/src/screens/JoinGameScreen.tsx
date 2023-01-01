import { View, Button, Text, StyleSheet, Pressable } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { EncodeMode, decode } from "html-entities";
import ButtonComponent from "../components/ButtonComponent";
import socket from "../util/socket";
import LoadingScreen from "./LoadingScreen";
import { useFocusEffect } from "@react-navigation/native";

export default function JoinGameScreen(props) {
  let [results, setResults] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  let screen = null;

  useFocusEffect(
    React.useCallback(() => {
      console.log("clean up results when starting");
      setResults(null);
      return () => {
        console.log("clean up");
        socket.emit("join_game", false);
      };
    }, [])
  );

  useEffect(() => {
    console.log("clean up JoinGameScreen works");
    socket.on("clean_up_questions", () => {
      console.log("creator of the game cleaned up");
      setResults(null);
    });
  }, [socket]);

  if (!results) {
    console.log("trying to join");
    socket.emit("give_me_questions");
    socket.on("receive_questions", (data) => {
      setResults(data);
      socket.emit("join_game", true);
    });
  }

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
          onPress={() => {
            socket.emit("join_game", false, () => {
              console.log("cleaned up");
            });
          }}
        />
      </View>
    );
    return screen;
  }
  return (
    <LoadingScreen text="Waiting for your opponent to create the game..." />
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
