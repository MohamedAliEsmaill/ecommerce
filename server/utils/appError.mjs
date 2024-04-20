class appError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    this.isOperational = true;
    //provide more detailed information about where and how the error occurred.
    Error.captureStackTrace(this, this.constructor);
  }
}

export default appError;
