"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Student_1 = require("../../../models/Student");
const getTeacherStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield Student_1.Student.find({ teacher: req.params.teacherId });
        res.json(students);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching students' });
    }
});
exports.default = getTeacherStudents;
