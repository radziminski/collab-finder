const { check, validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');
const validateReq = require('../utils/validateReq');

exports.getMyProfile = catchAsync(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    if (!profile) return next(new AppError('There is no profile for this user.', 400));

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

exports.profileValidator = [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills should be an array').isArray(),
];

const saveProfile = catchAsync(async (req, res, next, update = false, id = null) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new AppError('Wrong data sent.', 400, errors.array()));

    const { website, company, location, bio, status, daw, skills, youtube, facebook, instagram, soundcloud } = req.body;

    const profileFields = {};
    // Propably can be done better...
    profileFields.user = req.user.id;
    profileFields.website = website;
    profileFields.company = company;
    profileFields.location = location;
    profileFields.bio = bio;
    profileFields.status = status;
    profileFields.daw = daw;
    profileFields.skills = req.body.skills ? req.body.skills.split(',').map((skill) => skill.trim()) : undefined;
    profileFields.socials = {};
    profileFields.socials.youtube = youtube;
    profileFields.socials.facebook = facebook;
    profileFields.socials.instagram = instagram;
    profileFields.socials.soundcloud = soundcloud;

    // Clearing undefined fields so they dont get saved or updated
    for (let field in profileFields) if (!profileFields[field]) delete profileFields[field];
    for (let field in profileFields.socials) if (!profileFields.socials[field]) delete profileFields.socials[field];

    let profile;
    if (id) {
        profile = await Profile.findOne({ _id: id });
    } else if (req.user && req.user.id) {
        profile = await Profile.findOne({ user: req.user.id });
    } else return next(new AppError('User not defined'), 400);

    if (profile) {
        if (!update)
            return next(new AppError('Profile for that user already exists. Use update request to modify it.', 400));
        // Update profile
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
    } else {
        if (update)
            return next(new AppError('Profile for that user does not exist. Use post request to create it.', 400));
        // Create new profile
        profile = new Profile(profileFields);
        await profile.save();
    }

    res.status(201).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

exports.createProfile = catchAsync(async (req, res, next) => saveProfile(req, res, next));

exports.updateMyProfile = catchAsync(async (req, res, next) => saveProfile(req, res, next, true));
exports.updateProfile = catchAsync(async (req, res, next) => {
    saveProfile(req, res, next, true, req.params.id);
});

exports.getAllProfiles = catchAsync(async (req, res, next) => {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.status(200).json({
        status: 'success',
        count: profiles.length,
        data: [...profiles],
    });
});

exports.getProfileByUserId = catchAsync(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.id }).populate('user', ['name', 'avatar']);

    if (!profie) return next(new AppError('This user does not have a profile', 400));

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

exports.deleteMyProfile = catchAsync(async (req, res, next) => {
    const result = await Profile.findOneAndDelete({ user: req.user.id });
    // await User.findByIdAndUpdate(req.user.id, { active: false });
    if (!result) return next(new AppError('Such profile does not exist'), 400);
    res.status(204).json({});
});

// Function for adding fields in arrays in doc like experiance, education
const addNewProfileElement = catchAsync(async (req, res, next, parent) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new AppError('Wrong data sent.', 400, errors.array()));

    const newElement = { ...req.body };
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return next(new AppError('Profile for this user does not exist'), 400);

    profile[parent].unshift(newElement);
    await profile.save();

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

const deleteProfileElement = catchAsync(async (req, res, next, parent) => {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return next(new AppError('Profile for this user does not exist'), 400);

    const initialParentLength = profile[parent].length;
    profile[parent] = profile[parent].filter((el) => el._id.toString() !== req.params.id);
    if (initialParentLength === profile[parent].length)
        return next(new AppError(parent + ' element with given id does not exist in this profile'));
    await profile.save();

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

exports.experianceValidator = [check('title', 'Title is required').not().isEmpty(), check('from').not().isEmpty()];
exports.addProfileExperiance = catchAsync(
    async (req, res, next) => await addNewProfileElement(req, res, next, 'experiance')
);
exports.deleteProfileExperiance = catchAsync(
    async (req, res, next) => await deleteProfileElement(req, res, next, 'experiance')
);

exports.educationValidator = [
    check('school', 'School is required').not().isEmpty(),
    check('fieldOfStudy', 'FieldOfStudy is required').not().isEmpty(),
    check('from', 'Specify "from" date').not().isEmpty(),
];
exports.addProfileEducation = catchAsync(
    async (req, res, next) => await addNewProfileElement(req, res, next, 'education')
);
exports.deleteProfileEducation = catchAsync(async (req, res, next) => {
    await deleteProfileElement(req, res, next, 'education');
});
