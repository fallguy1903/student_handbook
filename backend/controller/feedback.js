const Feedback = require('../models/feedback');

exports.postFeedback = async (req, res) => {
    const { title, feedback } = req.body;
    const newfeedback = new Feedback({ title: title, feedback: feedback, date: new Date() });
    await newfeedback.save();
    res.status(201).json({message: "Feedback Added", feedback: feedback});
};

exports.getFeedbacks = async (req, res) =>{
    const feedbacks = await Feedback.find().sort({ date: -1 });
    res.json({msg: "Feedbacks retreived", feedbacks});
}