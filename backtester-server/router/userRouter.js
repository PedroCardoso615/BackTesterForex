const express = require("express");
const { signup, login } = require("../services/userService");
const { authenticateUser } = require("../middlewares/authMiddleware");

const userRouter = express.Router();

//Signup
userRouter.post("/signup", async (req, res) => {
  const { username, fullname, age, email, password, profilePicture } = req.body;

  try {
    const user = await signup({
      username,
      fullname,
      age,
      email,
      password,
      profilePicture,
    });

    res.json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Error creating user. Please try again later.",
    });
  }
});

//Login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, accessToken } = await login({ email, password });

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Login successful",
        user,
        accessToken,
      });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      error: "Invalid email or password",
    });
  }
});

//Logout
userRouter.post("/logout", (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "Logout successful",
    });
});

//Profile Data
userRouter.get("/profile", authenticateUser, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = userRouter;
