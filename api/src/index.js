const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const { connectDb } = require("../helpers/db")
const { host, port, db, authApiUrl } = require("../configuration/index")

const app = express();

const postSchema = new mongoose.Schema({
    name: String
});
const Post = mongoose.model("Post", postSchema);

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started API service on port: ${port}`);
        console.log(`On host: ${host}`);
        console.log(`Our database url: ${db}`);

        Post.find(function(err, posts) {
            if (err) {
                return console.error(err);
            }
            console.log("posts:", posts)
        });

        const silence = new Post({ name: "Slience" })
        silence.save(function(err, savedSilence) {
            if (err) {
                return console.error(err);
            }
            console.log("savedSilence", savedSilence)
        });

    });
};

app.get("/test", (req, res) => {
    res.send(`Our API on host - ${host}, on port - ${port}, with db Url - ${db} is working correctly`);
});

app.get("/testApiData", (req, res) => {
    res.json({
        testWithApi: true,
    });
});

app.get("/testWithCurrentUser", (req, res) => {
    axios.get(authApiUrl + "/currentUser").then(response => {
        res.json({
            testWithCurrentUser: true,
            currentUserFronAuth: response.data
        });
    });
});

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);

