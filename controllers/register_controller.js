const { getUserByEmail, createUser } = require("./../db/users");
const { body } = require("express-validator");
const bcrypt = require("bcrypt");
const { ApiError: apierr } = require("./../utilities/ApiError");
const validation = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("username character must by greet 3 and less 32"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/)
    .withMessage("Password must contain at least one uppercase letter and one special character"),
];

/**
 * Registers a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - Returns a promise that resolves with no value.
 */
const registerUser = async (req, res, next) => {
  // Destructure the request body to get the user information
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const [existingUser] = await getUserByEmail(email, "id");

    // If user exists, return error
    if (existingUser) {
      console.log("user if found", existingUser);
      return next(apierr.userFound());
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    // Add the new user to the database
    const [userCreated] = await createUser(newUser);

    // If user was not created, throw an error
    if (!userCreated.affectedRows) {
      throw new Error("Failed to create user");
    }

    // Return success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Return error message if an error occurred
    next(apierr.customError(res, 400, "Failed to create user"));
  }
};

module.exports = {
  validation,
  registerUser,
};
