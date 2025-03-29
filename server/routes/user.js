const express = require('express');
const { getUserProfile, updateUserProfile, getCurrentUser } = require('../controllers/userController');
const { protect, isOwnProfile } = require('../middleware/auth');

const router = express.Router();

router.get('/me', protect, getCurrentUser);
router.get('/:id', protect, isOwnProfile, getUserProfile);
router.put('/:id', protect, isOwnProfile, updateUserProfile);

module.exports = router;