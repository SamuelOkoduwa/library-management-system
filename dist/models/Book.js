"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    studentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Student'
    }
});
exports.Book = (0, mongoose_1.model)('Book', BookSchema);
