/* eslint-disable no-mixed-spaces-and-tabs */
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
		.catch(() => {
			res
				.status(500)
				.json({ message: "The posts information could not be retrieved" });
		});
});

// GET - Returns the post object with the specified id
router.get("/:id", (req, res) => {
	const id = req.params.id;

	Post.findById(id)
		.then((post) => {
			post
				? res.status(200).json(post)
				: res.status(404).json({
						message: "The post with the specified ID does not exist",
				  });
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: "The post information could not be retrieved" });
		});
});

// POST - Creates a post using the information sent inside the request body and returns the newly created post object

// PUT - Updates the post with the specified id using data from the request body and returns the modified document, not the original

// DELETE - Removes the post with the specified id and returns the deleted post object

// GET - Returns an array of all the comment objects associated with the post with the specified id

// don't forget to export!
module.exports = router;
