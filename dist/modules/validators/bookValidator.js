"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.bookValidationRules = [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('author').notEmpty().withMessage('Author is required'),
    (0, express_validator_1.body)('publishedYear').isInt({ min: 1000, max: new Date().getFullYear() })
];
