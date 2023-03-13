const { checkDuplicateUsernameOrEmail } = require("../middleware/verifySignUp");
const {verifyToken} = require("../middleware/authJwt");
const auth = require("../controllers/AuthController");

const express = require('express');
const router = express.Router();

router.route('/signup').post([checkDuplicateUsernameOrEmail],auth.signup);
router.route('/signin').post(auth.signin);


module.exports = router;