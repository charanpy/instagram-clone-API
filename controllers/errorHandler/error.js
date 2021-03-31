const AppError = require('../../utils/appError');

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data ${errors.join('.')}`;
  return new AppError(message, 400);
};

const handleCastErrorDb = (err) => {
  const message =
    `Invalid ${err.path} : ${err.value}.` +
    'The requested data is not available';
  return new AppError(message, 400);
};

const handleDuplicateFieldErrorDb = (err) => {
  const keyField = Object.keys(err.keyValue)[0];
  return new AppError(`Please use different ${keyField}`, 400);
};

const handleJwtTokenExpire = () => {
  return new AppError('Token has been expired!.Please register again', 401);
};

const handleMulterError = () => {
  return new AppError('Please select only one image', 400);
};

const handleWebTokenError = () => {
  return new AppError('Invalid Token.Please register again', 400);
};
const sendError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;

  err.status = err.status || 'error';

  let error = { ...err, message: err.message };
  //          console.log(error.name, 5)

  if (error.name === 'ValidationError') {
    error = handleValidationError(error);
  }
  if (error.name === 'TokenExpiredError') {
    error = handleJwtTokenExpire();
  }
  if (error.code === 11000) {
    error = handleDuplicateFieldErrorDb(error);
  }
  if (error.name === 'CastError' || error.kind === 'ObjectId')
    error = handleCastErrorDb(error);

  if (error.name === 'MulterError' && error.code === 'LIMIT_UNEXPECTED_FILE')
    error = handleMulterError();

  if (error.name === 'JsonWebTokenError') error = handleWebTokenError(error);
  sendError(error, res);
};
