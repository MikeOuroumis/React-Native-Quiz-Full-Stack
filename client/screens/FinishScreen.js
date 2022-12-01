import React from "react";
import Button from "../components/Button";
import { View, Text } from "react-native";

export default function FinishScreen(props) {
  return (
    <View className="quiz-container">
      <h1>Finished!</h1>
      <Text>
        Your Score is{" "}
        <span style={{ color: "#0c88fb", fontWeight: "bold" }}>
          {props.score}
        </span>
      </Text>
      <Button onClick={props.onClick} text="Try Again" />
    </View>
  );
}
