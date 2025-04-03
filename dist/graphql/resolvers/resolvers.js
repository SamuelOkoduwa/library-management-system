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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Book_1 = require("../../models/Book");
const Student_1 = require("../../models/Student");
const Teacher_1 = require("../../models/Teacher");
const cache_1 = require("../cache/cache");
exports.resolvers = {
    Query: {
        books: (0, cache_1.graphqlCache)(() => __awaiter(void 0, void 0, void 0, function* () { return yield Book_1.Book.find().populate('student'); }), 'all-books'),
        book: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield Book_1.Book.findById(id).populate('student'); }),
        booksByStudent: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { studentId }) { return yield Book_1.Book.find({ student: studentId }); }),
        students: (0, cache_1.graphqlCache)(() => __awaiter(void 0, void 0, void 0, function* () { return yield Student_1.Student.find().populate('teacher'); }), 'all-students'),
        studentsByTeacher: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { teacherId }) { return yield Student_1.Student.find({ teacher: teacherId }); }),
        teachers: (0, cache_1.graphqlCache)(() => __awaiter(void 0, void 0, void 0, function* () { return yield Teacher_1.Teacher.find(); }), 'all-teachers')
    },
    Mutation: {
        createBook: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const book = new Book_1.Book(args);
            yield book.save();
            return book.populate('student');
        }),
        updateBook: (_, _a) => __awaiter(void 0, void 0, void 0, function* () {
            var { id } = _a, args = __rest(_a, ["id"]);
            return yield Book_1.Book.findByIdAndUpdate(id, args, { new: true }).populate('student');
        }),
        deleteBook: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return yield Book_1.Book.findByIdAndDelete(id);
        }),
        assignBookToStudent: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { bookId, studentId }) {
            return yield Book_1.Book.findByIdAndUpdate(bookId, { student: studentId }, { new: true }).populate('student');
        })
    },
    Student: {
        books: (parent) => __awaiter(void 0, void 0, void 0, function* () { return yield Book_1.Book.find({ student: parent._id }); }),
        teacher: (parent) => __awaiter(void 0, void 0, void 0, function* () { return yield Teacher_1.Teacher.findById(parent.teacher); })
    },
    Teacher: {
        students: (parent) => __awaiter(void 0, void 0, void 0, function* () { return yield Student_1.Student.find({ teacher: parent._id }); })
    }
};
