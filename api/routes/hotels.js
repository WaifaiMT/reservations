import express from "express";

import {
  countByCity,
  countByType,
  createHotel,
  delateHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createHotel);

router.put("/:id", verifyAdmin, updateHotel);

router.delete("/:id", verifyAdmin, delateHotel);

router.get("/find/:id", getHotel);

router.get("/", getAllHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
