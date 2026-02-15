import express from "express";
import {getContent  ,  updateContent } from "../Handlers/ContentHandler.js";
import { AdminLogin } from "../Handlers/adminhandler.js";

const router = express.Router();

router.get("/", getContent);
router.put("/update", updateContent);
router.post('/admin' ,  AdminLogin)
export default router;
