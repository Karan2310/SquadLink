// controllers/teamController.js

import Team from "../models/Team.js";

const handleError = (res, error, statusCode = 500) => {
  console.error("Error:", error);
  res.status(statusCode).json({ error: "Internal Server Error" });
};

// Controller to create a new team
const createTeam = async (req, res) => {
  try {
    const { name, members } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Invalid team data" });
    }

    // Check if the team with the given name already exists
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      return res
        .status(400)
        .json({ error: "Team with this name already exists" });
    }

    const newTeam = await Team.create({ name, members });

    res.status(201).json(newTeam);
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to get all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().lean();

    res.status(200).json(teams);
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to get a specific team by ID
const getTeamById = async (req, res) => {
  try {
    const teamId = req.params.id;

    if (!teamId) {
      return res.status(400).json({ error: "Invalid team ID" });
    }

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.status(200).json(team);
  } catch (error) {
    handleError(res, error);
  }
};

const deleteTeamById = async (req, res) => {
  try {
    const teamId = req.params.id;

    if (!teamId) {
      return res.status(400).json({ error: "Invalid team ID" });
    }

    // Check if the team with the given ID exists
    const existingTeam = await Team.findById(teamId);
    if (!existingTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Delete the team
    await Team.findByIdAndDelete(teamId);

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

export { createTeam, getAllTeams, getTeamById, deleteTeamById };
