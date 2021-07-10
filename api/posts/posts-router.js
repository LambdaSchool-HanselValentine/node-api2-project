// implement your posts router here

// BASIC IMPORTS HERE =======
const express = require("express");
// router:
const router = express.Router();
//data:
const Post = require("./posts-model.js");
// ==========

//we use router. instead of server.
// then we write how we normally would write handlers

// GET - Returns an array of all the post objects contained in the database
router.get("/", (req, res) => {
	Post.find()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
				message: "Error retrieving posts",
			});
		});
});

// don't forget to export!
module.exports = router;
