import express from "express";
import {
  createTeam,
  getTeamById,
  getAllTeams,
  deleteTeamById,
} from "../controllers/teams.js";

const router = express.Router();

router.post("/", createTeam);

router.get("/", getAllTeams);

router.get("/:id", getTeamById);

router.delete("/:id", deleteTeamById);

export default router;
