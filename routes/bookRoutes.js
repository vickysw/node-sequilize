const express = require('express');
const router = express.Router();

const bookController = require('./../controllers/BookController');
const upload = require("../middleware/upload");
router.route('/upload').post(upload.single("file"), bookController.upload);
router.route('/').get(bookController.findAll).post(bookController.create);
router.route('/:id').get(bookController.findOne).patch(bookController.update).delete(bookController.delete).delete(bookController.deleteAll);
module.exports = router;