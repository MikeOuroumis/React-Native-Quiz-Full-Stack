const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
  },

  { Collection: "RegisteredUsers" }
);

mongoose.model("RegisteredUsers", UserDetailsSchema);
