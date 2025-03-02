const jwt = require("jsonwebtoken")
const userAuth = async (req, res, next) => {
    try {
        const user_token = req.session;
        console.log("token not found",user_token)
        if (!user_token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Verify token
        const decoded = await jwt.verify(user_token, process.env.SECURITY_KEY);
        
        // Store decoded user info in session (optional)
        req.session.userdata = decoded;
        next()
        
    } catch (error) {
        console.log("token verify error--", error)
        return res.status(404).send({ message: "user not verify", status: "error" })
    }

}

module.exports = userAuth