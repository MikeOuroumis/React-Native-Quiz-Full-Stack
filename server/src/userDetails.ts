const mong = require("mongoose");

const UserDetailsSchema = new mong.Schema(
  {
    userName: String,
    email: String,
    password: String,
  },

  { Collection: "RegisteredUsers" }
);

mong.model("RegisteredUsers", UserDetailsSchema);
