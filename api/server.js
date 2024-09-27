// implement your server here
// require your posts router and connect it here

//
//
//Imports:
const express = require("express");
// This is how you "import" a router:
const postsRouter = require("./posts/posts-router"); //Dividing our API into different routers to keep out code organized as the app grows. That is why we write our routers into separate files.

const server = express();

// Defining your import:
server.use(express.json());
server.use("/api/posts", postsRouter);

// This middleware is not bound to any URL prefix because it is a "default" router in Express() app - a constant called "server" in our instance here.
server.get("/", (req, res) => {
	res.send(`
    <h1> Hello World! </h1>
    <p> This is Express Routing </p>
    `);
});
// Thus, this handler will match "GET /" requests.

// exporting:
module.exports = server;
