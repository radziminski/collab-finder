const { check } = require('express-validator');
const Collab = require('../models/Collab');
const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');
const validateReq = require('../utils/validateReq');

exports.collabValidator = [
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('daws').not().isEmpty(),
    check('genres').not().isEmpty(),
];
exports.addNewCollab = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new AppError('Wrong data sent.', 400, errors.array()));

    const { title, description, daws, vsts, genres } = req.body;
    const collabFields = {};
    collabFields.user = req.user.id;
    collabFields.title = title;
    collabFields.description = description;
    collabFields.daws = daws.split(',').map((el) => el.trim());
    collabFields.genres = genres.split(',').map((el) => el.trim());
    if (vsts) collabFields.vsts = vsts.split(',').map((el) => el.trim());

    const collab = new Collab(collabFields);
    await collab.save();

    res.status(201).json({
        status: 'success',
        data: {
            collab,
        },
    });
});

exports.getAllCollabs = catchAsync(async (req, res, next) => {
    const collabs = await Collab.find().populate('user', ['name', 'avatar']).sort({ createdAt: -1 });

    res.status(200).json({
        status: 'success',
        data: {
            collabs,
        },
    });
});

exports.getCollab = catchAsync(async (req, res, next) => {
    const collab = await Collab.findOne({ _id: req.params.id }).populate('user', ['name', 'avatar']);
    if (!collab) return next(new AppError('Collab with given id does not exist'), 400);

    res.status(200).json({
        status: 'success',
        data: {
            collab,
        },
    });
});

exports.deleteCollab = catchAsync(async (req, res, next) => {
    const collab = await Collab.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!collab)
        return next(new AppError('Collab with given id does not exist or current user is not authorized'), 400);

    res.status(204).json({});
});

exports.updateCollab = catchAsync(async (req, res, next) => {
    const collab = await Collab.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body);
    if (!collab)
        return next(new AppError('Collab with given id does not exist or current user is not authorized'), 400);

    res.status(200).json({
        status: 'success',
        data: {
            collab,
        },
    });
});

exports.likeCollab = catchAsync(async (req, res, next) => {
    const collab = await Collab.findOne({ _id: req.params.id });
    if (!collab) return next(new AppError('Collab with given id does not exist'), 400);

    if (!collab.likes.includes(req.user.id)) collab.likes.unshift(req.user.id);
    else return next(new AppError('You already like this collab!', 400));
    await collab.save();

    res.status(200).json({
        status: 'success',
        data: {
            collab,
        },
    });
});

exports.unLikeCollab = catchAsync(async (req, res, next) => {
    const collab = await Collab.findOne({ _id: req.params.id });
    if (!collab) return next(new AppError('Collab with given id does not exist'), 400);

    const initialLength = collab.likes.length;
    collab.likes = collab.likes.filter((el) => el.toString() !== req.user.id);
    if (initialLength === collab.likes.length) return next(new AppError('You dont like this collab.', 400));
    await collab.save();

    res.status(200).json({
        status: 'success',
        data: {
            collab,
        },
    });
});

exports.collabCommentValidator = [check('text').not().isEmpty()];
exports.commentCollab = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new AppError('Wrong data sent.', 400, errors.array()));

    const collab = await Collab.findOne({ _id: req.params.id });
    if (!collab) return next(new AppError('Collab with given id does not exist'), 400);

    const comment = {
        user: req.user.id,
        text: req.body.text,
    };

    collab.comments.unshift(comment);
    await collab.save();

    res.status(200).json({
        status: 'success',
        data: {
            collab,
        },
    });
});

exports.unCommentCollab = catchAsync(async (req, res, next) => {
    const collab = await Collab.findOne({ _id: req.params.id });
    if (!collab) return next(new AppError('Collab with given id does not exist'), 400);

    const initialLength = collab.comments.length;
    collab.comments = collab.comments.filter(
        (el) => !(el._id.toString() === req.params.comment_id && el.user.toString() === req.user.id)
    );
    if (initialLength === collab.comments.length)
        return next(new AppError('Such comment does not exist or was not authorized', 400));
    await collab.save();

    res.status(200).json({
        status: 'success',
        data: {
            collab,
        },
    });
});

exports.applyForCollabValidator = [check('msg').not().isEmpty()];
exports.applyForCollab = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new AppError('Wrong data sent.', 400, errors.array()));

    const collab = await Collab.findOne({ _id: req.params.id });
    if (!collab) return next(new AppError('Collab with given id does not exist'), 400);

    if (collab.status !== 'searching')
        return next(new AppError('Collab was already confirmed, cant apply for it anymore.'), 400);

    if (collab.user.toString() === req.user.id) return next(new AppError('You cannot apply for your own collab.'), 400);
    if (collab.collaborators.find((el) => el.user.toString() === req.user.id))
        return next(new AppError('You are already collaborator in this collab, you cannot apply for it'));

    console.log(collab.requests);
    if (collab.requests.find((el) => el.user.toString() === req.user.id))
        return next(new AppError('You already apply for this collab.'), 400);

    const request = {
        user: req.user.id,
        msg: req.body.msg,
    };

    collab.requests.unshift(request);
    await collab.save();

    res.status(200).json({
        status: 'success',
        data: {
            collab,
        },
    });
});

exports.unApplyForCollab = catchAsync(async (req, res, next) => {
    const collab = await Collab.findOne({ _id: req.params.id });
    if (!collab) return next(new AppError('Collab with given id does not exist'), 400);

    const initialLength = collab.requests.length;
    collab.requests = collab.requests.filter((el) => !(el.user.toString() === req.user.id));

    if (initialLength === collab.requests.length)
        return next(new AppError('You are not applying for this collab', 400));

    await collab.save();

    res.status(200).json({
        status: 'success',
        data: {
            collab,
        },
    });
});

exports.unCollaborateForCollab = catchAsync(async (req, res, next) => {
    const collab = await Collab.findOne({ _id: req.params.id });
    if (!collab) return next(new AppError('Collab with given id does not exist'), 400);

    const initialLength = collab.collaborators.length;
    collab.collaborators = collab.collaborators.filter((el) => !(el.user.toString() === req.user.id));

    if (initialLength === collab.collaborators.length)
        return next(new AppError('You are not collaborator in this collab', 400));

    await collab.save();

    res.status(200).json({
        status: 'success',
        data: {
            collab,
        },
    });
});

exports.confirmCollaborator = catchAsync(async (req, res, next) => {
    const collab = await Collab.findOne({ _id: req.params.id, user: req.user.id });
    if (!collab) return next(new AppError('Collab with given id does not exist or user not authorized'), 400);

    const request = collab.requests.find((el) => {
        console.log(el);
        return el.user.toString() === req.params.collaborator_id;
    });

    if (!request) return next(new AppError('Such user is not applying for this collab', 400));

    collab.collaborators.unshift(request);
    collab.requests = collab.requests.filter((el) => el.user.toString() !== req.params.collaborator_id);
    await collab.save();

    res.status(200).json({
        status: 'success',
        data: {
            collab,
        },
    });
});

exports.unConfirmCollaborator = catchAsync(async (req, res, next) => {
    const collab = await Collab.findOne({ _id: req.params.id, user: req.user.id });
    if (!collab) return next(new AppError('Collab with given id does not exist or user not authorized'), 400);

    const collaborator = collab.collaborators.find((el) => {
        console.log(el);
        return el.user.toString() === req.params.collaborator_id;
    });

    if (!collaborator) return next(new AppError('Such user is not collaborator in this collab', 400));

    collab.requests.unshift(collaborator);
    collab.collaborators = collab.collaborators.filter((el) => el.user.toString() !== req.params.collaborator_id);
    await collab.save();

    res.status(200).json({
        status: 'success',
        data: {
            collab,
        },
    });
});

exports.startCollab = catchAsync(async (req, res, next) => {
    const collab = await Collab.findOne({ _id: req.params.id, user: req.user.id });
    if (!collab) return next(new AppError('Collab with given id does not exist or user not authorized'), 400);

    if (collab.status !== 'searching') return next(new AppError('Collab was already started or finished.', 400));

    collab.status = 'inprogress';

    await collab.save();

    res.status(200).json({
        status: 'success',
        data: {
            collab,
        },
    });
});

exports.finishCollab = catchAsync(async (req, res, next) => {
    const collab = await Collab.findOne({ _id: req.params.id, user: req.user.id });
    if (!collab) return next(new AppError('Collab with given id does not exist or user not authorized'), 400);

    if (collab.status !== 'inprogress')
        return next(new AppError('Collab was already finished or not even started.', 400));

    collab.status = 'finished';

    await collab.save();

    res.status(200).json({
        status: 'success',
        data: {
            collab,
        },
    });
});

exports.unFinishCollab = catchAsync(async (req, res, next) => {
    const collab = await Collab.findOne({ _id: req.params.id, user: req.user.id });
    if (!collab) return next(new AppError('Collab with given id does not exist or user not authorized'), 400);

    if (collab.status !== 'finished') return next(new AppError('Collab was not yet finished.', 400));

    collab.status = 'inprogress';

    await collab.save();

    res.status(200).json({
        status: 'success',
        data: {
            collab,
        },
    });
});
