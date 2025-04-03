"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const StudentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    grade: { type: String, required: true },
    teacher: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Teacher', required: true }
});
exports.Student = (0, mongoose_1.model)('Student', StudentSchema);
