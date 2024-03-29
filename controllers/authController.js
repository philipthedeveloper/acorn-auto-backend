import {
  createBadRequestError,
  createUnauthorizedError,
} from "../errors/index.js";
import { Email, User, Holiday, Career } from "../models/index.js";
import { StatusCodes } from "http-status-codes";

const login = async function (req, res) {
  const data = req.body;
  const numOfKeys = Object.keys(data).length;
  if (numOfKeys === 0 || !data.email || !data.password)
    throw createBadRequestError("Email and Password required");
  const user = await User.findOne({ email: data.email });
  if (!user) throw createUnauthorizedError("Invalid Email or Password");
  // Validate the password using the document method (validatePassword)
  /**
   * @function
   * @argument password @type String
   * @returns @type Boolean
   */
  const isValidPassword = await user.validatePassword(data.password);
  if (!isValidPassword)
    throw createUnauthorizedError("Invalid Email or Password");
  // Generate jwt for valid email and password
  const { _id, email } = user;
  const accessToken = user.generateToken({ userId: _id, email });
  const formEmail = await Email.find({});
  return res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Login successful",
    user: {
      userId: _id,
      email,
    },
    accessToken,
    formEmail: formEmail[0],
  });
};

const register = async function (req, res) {
  const data = req.body;
  const numOfKeys = Object.keys(data).length;
  if (numOfKeys === 0) throw createBadRequestError("Provide all fields");
  const newUser = await User.create(data);
  const { _id, email } = newUser;
  const accessToken = newUser.generateToken({
    userId: _id,
    email,
  });
  const formEmail = await Email.find({});
  return res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "Account created successfully",
    user: {
      userId: _id,
      email,
    },
    accessToken,
    formEmail: formEmail[0],
  });
};

const getUser = async (req, res) => {
  if (req.currentUser) {
    const { _id, email } = req.currentUser;
    const formEmail = await Email.find({});
    return res.status(StatusCodes.OK).json({
      success: true,
      status: StatusCodes.OK,
      message: "Successful",
      user: {
        userId: _id,
        email,
      },
      formEmail: formEmail[0],
    });
  }
  throw createUnauthorizedError("User not authenticated");
};

export { login, register, getUser };
