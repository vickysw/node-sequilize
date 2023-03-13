const express = require('express');
const router = express.Router();
const {checkDuplicateUsernameOrEmail} = require('../middleware/verifySignUp');

const userController = require('../controllers/UserController');

// const upload = require("../middleware/upload");
// router.route('/upload').post(upload.single("file"), bookController.upload);
// router.route('/login').post(userController.login);
router.route('/').get(userController.findAll);//.post([checkDuplicateUsernameOrEmail],userController.create);
router.route('/:id').get(userController.findOne).patch(userController.update).delete(userController.delete).delete(userController.deleteAll);
module.exports = router;