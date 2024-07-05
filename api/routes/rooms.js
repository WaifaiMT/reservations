import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createRoom,
  delateRoom,
  getAllRooms,
  getRoom,
  updateRoom,
} from "../controllers/roomController.js";

const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);

router.put("/:id", verifyAdmin, updateRoom);

router.delete("/:id/:hotelid", verifyAdmin, delateRoom);

router.get("/:id", getRoom);

router.get("/", getAllRooms);

export default router;
