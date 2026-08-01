const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


// PROTECT ROUTES
const protect = async (req, res, next) => {

    let token;

     console.log("Authorization Header:", req.headers.authorization);

    // check token exists
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        try {

            // get token from header
            token = req.headers.authorization.split(" ")[1];

               console.log("TOKEN:", token);

            // verify token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

              console.log("DECODED:", decoded);

            // get user from database
            req.user = await User.findById(decoded.id)
                .select("-password");

                    console.log("USER:", req.user);

            if (!req.user) {
                return res.status(401).json({
                    message: "user no longer exists",
                })
            }

            next();

        } catch (error) {

            console.log("JWT ERROR:", error.message);

            return res.status(401).json({
                message: "Not authorized, token failed",
            });

        }

    }

    if (!token) {

         console.log("NO TOKEN");

        return res.status(401).json({
            message: "Not authorized, no token",
        });

    }

};


// ADMIN ONLY
const admin = async (req, res, next) => {

    try {


        const freshUser = await User.findById(req.user._id)

        if (!freshUser || !freshUser.isAdmin) {

            return res.status(401).json({
                message: "Not authorized as admin",
            });
        }

        next()

    }

    catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }



};




module.exports = {
    protect,
    admin,
};

