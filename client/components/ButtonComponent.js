import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

export default function ButtonComponent(props) {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#2563bb" : "#2563eb",
        },
        styles.button,
      ]}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    borderRadius: 20,
    height: 45,
    marginHorizontal: 35,
    color: "#fff",
    justifyContent: "center",
    borderColor: "white",
    marginTop: 60,
    // backgroundColor: "#2563eb",
    borderRadius: 20,
    textAlign: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});
