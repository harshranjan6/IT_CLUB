const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true,
        validate: [arr => arr.length >= 2, "A question must have at least 2 options"]
    },
    correctAnswer: {
        type: String,
        required: true
    }
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
