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
const Book_1 = require("../../../models/Book");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, publishedYear, studentId } = req.body;
        const newBook = new Book_1.Book({
            title, author, publishedYear
        });
        yield newBook.save();
        res.status(201).json({
            status: true,
            newBook: newBook
        });
    }
    catch (error) {
        console.error('Book creation error:', error);
        res.status(400).json({
            message: 'Error creating book',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.default = createBook;
