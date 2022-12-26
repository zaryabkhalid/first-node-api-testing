import CustomErrors from "../errors/CustomErrors.js"

const erorrHandler = (error, req, res, next) => {
  if (error instanceof CustomErrors) {
    res.status(error.status).json({
      error: {
        status: error.status,
        message: error.message,
      },
    })
  } else {
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
}

export default erorrHandler
