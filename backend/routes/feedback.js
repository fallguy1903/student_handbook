const express = require('express');
const feedbackController = require('../controller/feedback');
const isAuth = require('../middleware/isAuth');

const router = express.Router();


router.get('/feedbacks', isAuth, feedbackController.getFeedbacks);


// router.get('/feedback/:feedbackId', isAuth, postController.getFeedback); */


router.post('/feedback', isAuth, feedbackController.postFeedback);

module.exports = router;