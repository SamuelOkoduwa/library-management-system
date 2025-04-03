"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const mongoose_1 = require("mongoose");
const TeacherSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subject: { type: String, required: true }
});
exports.Teacher = (0, mongoose_1.model)('Teacher', TeacherSchema);
