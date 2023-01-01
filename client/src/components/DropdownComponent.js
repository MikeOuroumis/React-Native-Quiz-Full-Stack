import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";

export default function DropdownComponent(props) {
  return (
    <SelectDropdown
      data={props.data}
      defaultValue={props.defaultValue}
      renderDropdownIcon={() => {
        return <Ionicons name="chevron-down" size={24} color="black" />;
      }}
      buttonStyle={{
        backgroundColor: "#fff",
        borderRadius: 20,
        width: "80%",
        marginHorizontal: 40,
        height: 50,
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
      }}
      buttonTextStyle={{
        color: "#000",
        textAlign: "center",
        fontSize: 18,
      }}
      onSelect={props.onSelect}
      rowStyle={{
        backgroundColor: "#fff",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
      rowTextStyle={{
        color: "#000",
        textAlign: "center",
        fontSize: 18,
      }}
      dropdownStyle={{
        backgroundColor: "#fff",
        width: "80%",
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
    />
  );
}
