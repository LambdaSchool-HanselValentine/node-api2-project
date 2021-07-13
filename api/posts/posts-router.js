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
				? res.status(200).send(post)
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
router.post("/", (req, res) => {
	const postData = req.body;

	if (!postData.title || !postData.contents) {
		res.status(400).json({
			message: "Please provide title and contents for the post",
		});
	} else {
		Post.insert(postData)
			.then((postId) => {
				//the return of the then() is an ID so tests are failing.
				res.status(201).send(postId);
			})
			.catch(() => {
				res.status(500).json({
					message: "There was an error while saving the post to the database",
				});
			});
	}
});

// PUT - Updates the post with the specified id using data from the request body and returns the modified document, not the original
router.put("/:id", (req, res) => {
	const { id } = req.params;
	const newData = req.body;

	if (!newData.title || !newData.contents) {
		res.status(400).json({
			message: "Please provide title and contents for the post",
		});
	} else {
		Post.update(id, newData)
			.then((updatedData) => {
				updatedData
					? res.status(200).json(updatedData)
					: res.status(404).json({
							message: "The post with the specified ID does not exist",
					  });
			})
			.catch(() => {
				res.status(500).json({
					message: "The post information could not be modified",
				});
			});
	}
});

// DELETE - Removes the post with the specified id and returns the deleted post object
router.delete("/:id", (req, res) => {
	const { id } = req.params;

	Post.remove(id)
		.then((post) => {
			post
				? res.status(200).send(post)
				: res.status(404).json({
						message: "The post with the specified ID does not exist",
				  });
		})
		.catch(() => {
			res.status(500).json({ message: "The post could not be removed" });
		});
});

// GET - Returns an array of all the comment objects associated with the post with the specified id
router.get("/:id/comments", (req, res) => {
	const { id } = req.params;

	Post.findPostComments(id)
		.then((comment) => {
			comment
				? res.status(200).json(comment)
				: res.status(404).json({
						message: "The post with the specified ID does not exist",
				  });
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: "The comments information could not be retrieved" });
		});
});

// GET - specific comment
router.get("/:id/comments/:id");
// ? how do we defined 2 IDs ???

// don't forget to export!
module.exports = router;
