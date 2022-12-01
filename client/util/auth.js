import { axios } from "axios";

const API_KEY = "AIzaSyBgBJR22e_E38n7KPxwXVMBkDsOspVqRbI";
export async function createUser(email, password) {
  const response = await axios.post("https://localhost:5000/register", {
    email: email,
    password: password,
  });
}
