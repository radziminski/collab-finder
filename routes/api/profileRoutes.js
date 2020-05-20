const express = require('express');
const authUser = require('../../middleware/authUser');
const profileController = require('../../controllers/profileController');

const router = express.Router();

// @route   GET api/profile
// @desc    Test route
// @access  Public
router.route('/me').get(authUser, profileController.getMyProfile);

router
    .route('/')
    .get(profileController.getAllProfiles)
    .post([authUser, ...profileController.profileValidator], profileController.createProfile)
    .patch(authUser, profileController.updateMyProfile)
    .delete(authUser, profileController.deleteMyProfile);

// Should be protected!
router.route('/update/:id').patch(profileController.updateProfile);

// Get profile by user id
router.route('/user/:id').get(profileController.getProfileByUserId);

router
    .route('/experiance')
    .patch([authUser, ...profileController.experianceValidator], profileController.addProfileExperiance);

router.route('/experiance/:id').delete(authUser, profileController.deleteProfileExperiance);

router
    .route('/education')
    .patch([authUser, ...profileController.educationValidator], profileController.addProfileEducation);

router.route('/education/:id').delete(authUser, profileController.deleteProfileEducation);

module.exports = router;
