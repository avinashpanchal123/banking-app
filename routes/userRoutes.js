const express = require('express');
const router =  express.Router();
const userController = require('./../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/add', userController.addUser);
// router.post('/edit', userController.editUser);
router.post('/delete', userController.deleteUser)

module.exports = router;