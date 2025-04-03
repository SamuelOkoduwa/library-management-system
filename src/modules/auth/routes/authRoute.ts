import express from "express";
import register from "../controller/register";
import login from "../controller/login";

const router = express.Router()

router.post('/register', register);
router.post('/login', login);

export default router;