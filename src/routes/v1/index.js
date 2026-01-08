const express = require('express');

const UserController = require('../../controllers/user-controller');
const { validateUserAuth } = require('../../middlewares/index');

const router = express.Router();

router.post('/signup',validateUserAuth,UserController.create);
router.post('/signin',validateUserAuth,UserController.signIn);

module.exports = router;