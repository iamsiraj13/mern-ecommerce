// error response

const errorResponse = (
  res,
  { statusCode = 500, message = "Interner Server Error" }
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

// success response
const successResponse = (
  res,
  { statusCode = 200, message = "Success", payload = {} }
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    payload: payload,
  });
};

module.exports = { errorResponse, successResponse };
