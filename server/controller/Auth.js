const jwt = require("jsonwebtoken");

exports.Auth = async (req, res) => {
    try {
        const { token } = req.cookies.token 
        || req.body.token 
        || req.header("Authorisation").replace("Bearer ", "");
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.email=decodedToken.Email;
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