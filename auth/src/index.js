const express = require("express");
const axios = require("axios");
const { connectDb } = require("../helpers/db")
const { host, port, db, apiUrl } = require("../configuration/index")

const app = express();

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started auth service on port: ${port}`);
        console.log(`On host: ${host}`);
        console.log(`Our database url: ${db}`);
    });
};

app.get("/test", (req, res) => {
    res.send(`Our auth on host - ${host}, on port - ${port}, with db Url - ${db} is working correctly`);
});

app.get("/api/currentUser", (req, res) => {
    res.json({
        id: "1234",
        email: "dmitry_yugay@mail.ru"
    });
});

app.get("/testApiData", (req, res) => {
    axios.get(apiUrl + "/testApiData").then(response => {
        res.json({
            testApiData: response.data.testWithApi
        });
    });
});

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);
