const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const verifyToken = (req, res, next) => {
    const access_token = req.cookies.access_token;
    if (!access_token) {
        return res.status(401).send("Access token is required");
    }
    try {
        jwt.verify(access_token, config.secret, (err, decoded) => {
            if (decoded.exp < Math.round(new Date(Date.now()) / 1000)) {
                throw new Error("Access token is expired");
            }
            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        const refresh_token = req.cookies.refresh_token;
        if (!refresh_token) {
            res.clearCookie("access_token");
            return res.status(401).send("Refresh token is required");
        }
        try {
            const decoded = jwt.verify(
                refresh_token,
                config.secret,
                (err, decoded) => {
                    if (decoded.exp < Math.round(new Date(Date.now()) / 1000)) {
                        throw new Error("Refresh token is expired");
                    }
                    req.userId = decoded.id;
                },
            );
            // Generate a new access token and send it back to the client
            const newAccessToken = jwt.sign(
                {
                    id: req.userId,
                    exp: Math.round(new Date(Date.now()) / 1000) + 30,
                },
                config.secret,
            );
            res.cookie("access_token", newAccessToken, { httpOnly: true });
            next();
            return;
        } catch (err) {
            return res.status(401).send("Invalid refresh token");
        }
    }
};

module.exports = { verifyToken };
