class CommonUtils {

  buildError (message, statusCode, errorCode, details) {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.code = errorCode;
    error.details = details;

    return error;
  }

}

module.exports = new CommonUtils();
