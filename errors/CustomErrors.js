class CustomErrors {
  constructor(status, message) {
    this.status = status
    this.message = message
  }

  static validationError(message = "All fields are required...") {
    return new CustomErrors(422, message)
  }

  static NotFoundError(message = "Not Found") {
    return new CustomErrors(404, message)
  }

  static SomethingWentWrong(message = "Something went wrong please try again") {
    return new CustomErrors(400, message)
  }

  static AuthorizationError(message = "Not Authorized") {
    return new CustomErrors(401, message)
  }
}

export default CustomErrors
