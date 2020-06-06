const express = require('express');
const authUser = require('../../middleware/authUser');
const collabController = require('../../controllers/collabController');

const router = express.Router();

router
    .route('/')
    .get(collabController.getAllCollabs)
    .post([authUser, collabController.collabValidator], collabController.addNewCollab);

router.route('/delete/:id').delete(authUser, collabController.deleteCollab);

router.route('/get/:id').get(collabController.getCollab);

router.route('/edit/:id').patch(authUser, collabController.updateCollab);

router.route('/like/:id').patch(authUser, collabController.likeCollab);

router.route('/unlike/:id').patch(authUser, collabController.unLikeCollab);

router.route('/comment/:id').patch([authUser, collabController.collabCommentValidator], collabController.commentCollab);

router.route('/uncomment/:id/:comment_id').patch(authUser, collabController.unCommentCollab);

router
    .route('/apply/:id')
    .patch([authUser, ...collabController.applyForCollabValidator], collabController.applyForCollab);
router.route('/unapply/:id').patch(authUser, collabController.unApplyForCollab);

router.route('/uncollaborate/:id').patch(authUser, collabController.unCollaborateForCollab);

router.route('/confirm/:id/:collaborator_id').patch(authUser, collabController.confirmCollaborator);
router.route('/unconfirm/:id/:collaborator_id').patch(authUser, collabController.unConfirmCollaborator);

router.route('/start/:id').patch(authUser, collabController.startCollab);

router.route('/finish/:id').patch(authUser, collabController.finishCollab);
router.route('/unfinish/:id').patch(authUser, collabController.unFinishCollab);

module.exports = router;
