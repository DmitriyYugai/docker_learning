const express = require("express");
const { connectDb } = require("../helpers/db")
const { host, port, db } = require("../configuration/index")

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

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);
