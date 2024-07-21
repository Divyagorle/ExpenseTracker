const express = require('express');
const router = express.Router();
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/userController');

// Route for creating a user
router.post('/signup', createUser);

// Route for getting a user by ID
router.get('/:id', getUser);

// Route for updating a user by ID
router.put('/:id', updateUser);

// Route for deleting a user by ID
router.delete('/:id', deleteUser);

// Route for user login
router.post('/login', loginUser);

module.exports = router;
