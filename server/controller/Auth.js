const jwt = require("jsonwebtoken");

exports.Auth = async (req, res,next) => {
    try { 
        const  token  = req.body.token  || req.header("Authorization").replace("Bearer ", "");
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.body.Email=decodedToken.email;
            next();
        } catch (error) {
            // Handle invalid signature error
            if (error.name === 'JsonWebTokenError' && error.message === 'invalid signature') {
                return res.json({
                    response: "Invalid Signature"
                });
            } else {
                // Handle other errors
                console.log("error", error);
                return res.status(500).json({
                    response: "Internal Server Error"
                });
            }
        }
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            response: "Internal Server Error"
        });
    }
};