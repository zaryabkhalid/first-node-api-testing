import JWT from "jsonwebtoken"

// generate Json Web Token
const generateJWT = (id) => {
  return JWT.sign({ id }, process.env.APP_JWT_SECRET, {
    expiresIn: "1h",
  })
}

export default generateJWT
