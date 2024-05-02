const jwt = require("jsonwebtoken");

exports.DecodeToken = async (req, res) => {
    console.log("backend me")
    try {
        const { token } = req.body;
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decodedToken", decodedToken)
            return res.json({
                Email: decodedToken.email
            });
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