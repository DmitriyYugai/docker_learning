const express = require("express");
const { connectDb } = require("../helpers/db")
const { host, port, db } = require("../configuration/index")

const app = express();

const startServer = () => {
    app.listen(3000, () => {
        console.log(`Started API service on port: ${port}`);
        console.log(`On host: ${host}`);
        console.log(`Our database url: ${db}`);
    });
};

app.get("/test", (req, res) => {
    res.send(`Our API on host - ${host}, on port - ${port}, with db Url - ${db} is working correctly`);
});

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);

