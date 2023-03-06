require("dotenv").config();

module.exports = {
    secret: process.env.SECRET_KEY,
    jwtExpiration: 60, // 1 minute
    jwtRefreshExpiration: 1296000, // 15 days
};
