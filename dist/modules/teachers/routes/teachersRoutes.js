"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getteachers_1 = __importDefault(require("../controller/getteachers"));
const getTeacherStudents_1 = __importDefault(require("../controller/getTeacherStudents"));
// import { cache } from '../../../middlewares/cache';
// import { auth } from '../../../middlewares/auth';
const router = (0, express_1.Router)();
router.get('/', getteachers_1.default);
router.get('/:teacherId/students', getTeacherStudents_1.default);
// router.get('/', cache('all-teachers'), getTeachers);
// router.get('/:teacherId/students', cache('teacher-students'), getTeacherStudents);
exports.default = router;
