const {signAccessToken, verifyRefreshToken} = require("../helpers/authtoken")

const generateNewAccessToken = async (refreshToken) => {

  const payloadEmail = await verifyRefreshToken(refreshToken)
 
 if (!payloadEmail) throw createError.Unauthorized()
 
 const newAccessToken = await signAccessToken(payloadEmail)

 return newAccessToken;
 
}

module.exports = {
 generateNewAccessToken
}