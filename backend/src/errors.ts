export const errorMessages = {
  VALIDATION_ERROR: {
      statusCode: 400,
      message: "Invalid input params"
  },
    EMAIL_EXISTS_ERROR: {
      statusCode: 400,
        message: "User with such email already exists. Choose new one or login"
    },
    WRONG_EMAIL_ERROR: {
        statusCode: 400,
        message: "There is no user with such email... Check it please"
    },
    INVALID_PASSWORD_ERROR: {
      statusCode: 400,
        message: "Invalid password... Check it and try again"
    },
};

