"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAllbooks_1 = __importDefault(require("../controller/getAllbooks"));
const createBook_1 = __importDefault(require("../controller/createBook"));
const getABook_1 = __importDefault(require("../controller/getABook"));
const updateAbook_1 = __importDefault(require("../controller/updateAbook"));
const deleteABook_1 = __importDefault(require("../controller/deleteABook"));
const router = (0, express_1.Router)();
router.get('/', getAllbooks_1.default);
router.get('/:id', getABook_1.default);
router.post('/', createBook_1.default);
router.put('/:id', updateAbook_1.default);
router.delete('/:id', deleteABook_1.default);
exports.default = router;
