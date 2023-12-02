import express from "express";
import { createTeam, getTeamById, getAllTeams } from "../controllers/teams.js";

const router = express.Router();

router.post("/", createTeam);

router.get("/", getAllTeams);

router.get("/:id", getTeamById);

export default router;
