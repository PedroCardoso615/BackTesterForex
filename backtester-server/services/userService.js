const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const { createAccessToken } = require("./authService");

const passwordValidation = /^(?=.*[A-Z])(?=.*\d.*\d.*\d)(?=.*[!@#$%^&*]).{6,}$/;

const signup = async ({ username, fullname, age, email, password, profilePicture }) => {
  if (!passwordValidation.test(password)) {
    throw new Error(
      "Password must contain at least 6 characters, 1 uppercase letter, 3 digits, and 1 special character"
    );
  }

  const salt = await bcrypt.genSaltSync(10);
  const encryptedPassword = await bcrypt.hashSync(password, salt);

  const newUser = new UserModel({
    username,
    fullname,
    age,
    email,
    password: encryptedPassword,
    profilePicture,
  });

  return await newUser.save();
};

const login = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("User Not Found");
  }

  const result = await bcrypt.compareSync(password, user.password);
  if (!result) {
    throw new Error("Failed to authenticate");
  }

  delete user.password;
  delete user.__v;

  const accessToken = createAccessToken({
    userId: user._id,
    email,
    ...user,
  });

  return {
    user,
    accessToken,
  };
};

module.exports = {
  signup,
  login,
};
