import User from "../models/User.js";

const handleError = (res, error, statusCode = 500) => {
  console.error("Error:", error);
  res.status(statusCode).json({ error: "Internal Server Error" });
};

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const searchQuery = req.query.search || "";

    const query = {
      $or: [
        { first_name: { $regex: searchQuery, $options: "i" } },
        { last_name: { $regex: searchQuery, $options: "i" } },
      ],
    };

    const [totalCount, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      users: users || [],
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    handleError(res, error);
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;

    if (!userData) {
      return res.status(400).json({ error: "Invalid user data" });
    }

    const newUser = await User.create(userData);

    res.status(201).json(newUser);
  } catch (error) {
    handleError(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;

    if (!userId || !updatedUserData) {
      return res.status(400).json({ error: "Invalid user ID or update data" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    handleError(res, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
