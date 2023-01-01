"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const http = require("http");
const JWT_SECRET = "asdlkjlj390[(9ikj}}JIJIF883jASIj3";
const mongoUrl = "mongodb+srv://mikeour:quizapp@cluster0.bs5sboi.mongodb.net/?retryWrites=true&w=majority";
mongoose
    .connect(mongoUrl, { useNewUrlParser: true })
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.log(err));
require("./userDetails");
const User = mongoose.model("RegisteredUsers");
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    const encryptedPassword = yield bcrypt.hash(password, 10);
    try {
        const oldUser = yield User.findOne({ email });
        if (oldUser) {
            return res.json({ error: "user exists" });
        }
        yield User.create({
            userName,
            email,
            password: encryptedPassword,
        });
        res.send({ status: "ok" });
    }
    catch (error) {
        res.send({ status: "error" });
    }
}));
app.post("/login-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User.findOne({ email });
    if (!user) {
        return res.json({ error: "User not found" });
    }
    if (yield bcrypt.compare(password, user.password)) {
        //this doesn't give me the email so I set the email to data below
        const token = jwt.sign({ email: user.email }, JWT_SECRET);
        if (res.status(201)) {
            return res.json({
                status: "ok",
                data: {
                    token: token,
                    email: user.email,
                    userName: user.userName,
                },
            });
        }
        else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "Invalid Password" });
}));
app.post("/userData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    console.log(token);
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const userEmail = user.email;
        console.log(userEmail);
        User.findOne({ email: userEmail }).then((data) => {
            res.send({ status: "ok", data: data });
        });
    }
    catch (error) { }
}));
// ==========socket.io================
const Server = app.listen(5002);
let questions;
let opponentJoined = false;
const io = require("socket.io")(Server, {
    cors: {
        origin: "http://192.168.1.55:5002",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);
    socket.on("on_connect", (msg) => {
        console.log(msg);
    });
    socket.on("send_answer", (data) => {
        socket.broadcast.emit("receive_answer", data);
    });
    socket.on("send_questions", (data) => {
        questions = data;
        socket.broadcast.emit("receive_questions", data);
    });
    console.log("the questions are", questions);
    socket.emit("receive_questions", questions);
    socket.on("give_me_questions", () => {
        socket.emit("receive_questions", questions);
    });
    socket.on("join_game", (data) => {
        opponentJoined = data;
        socket.broadcast.emit("opponent_joined", data);
        // console.log("opponent joined", data);
    });
    // console.log("opponent joined", opponentJoined);
    socket.on("clean_up", () => {
        questions = null;
        socket.broadcast.emit("clean_up_questions", () => console.log("questions cleaned up successfully"));
    });
});
app.listen(5000, () => {
    console.log("server running on port 5000");
});
