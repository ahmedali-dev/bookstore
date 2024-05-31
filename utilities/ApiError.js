class ApiError {
  constructor(status, code, message) {
    this.message = message;
    this.status = status;
    this.code = code;
  }

  static userNotFound(message = "Email or Password isn't correct") {
    return new ApiError(404, "1278cd", message);
  }

  static userFound(message = "User already exists") {
    return new ApiError(409, "1278cc", message);
  }

  static validationError(message) {
    return new ApiError(400, "1278cb", message);
  }

  static unauthorizedError(message = "Unauthorized") {
    return new ApiError(401, "1278cv", message);
  }

  static tokenExpiredError(message = "Unauthorized") {
    return new ApiError(401, "1278ca", message);
  }

  static refreshExpiredError(message = "Unauthorized") {
    return new ApiError(401, "1278ce", message);
  }

  static serverError(message = "Internal Server Error") {
    return new ApiError(500, "1278c9", message);
  }

  static customError(status, message) {
    return new ApiError(status, "1278c90", message);
  }

  static addressNotFound(message = "no address found") {
    return new ApiError(404, "1278c91", message);
  }
  static userSuspended(message = "user suspended") {
    return new ApiError(403, "1278c92", message);
  }
}

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.log("error from errorhanlder", err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ ErrCode: err.code, msg: err.message });
  }

  // Handle other errors
  console.error("e->", err);
  return res.status(500).json({ ErrCode: "1278c9", msg: "Internal Server Error" });
};

module.exports = {
  ApiError,
  errorHandler,
};
