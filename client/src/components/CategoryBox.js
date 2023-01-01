import { Button, Text, StyleSheet, View } from "react-native";

export default function CategoryBox(props) {
  return (
    <Button
      title={props.title}
      onPress={props.onPress}
      style={styles.button}
      color="#2563eb"
    />
  );
}
const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    borderRadius: 20,
    height: 200,
    marginHorizontal: 35,
    color: "#fff",
    justifyContent: "center",
    borderColor: "white",
    marginTop: 60,
    elevation: 5,
    margin: 10,
    // backgroundColor: "#2563eb",
  },
});
