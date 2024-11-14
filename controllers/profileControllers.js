const{User} =  require("../models/index");
const { where } = require("sequelize");

const changePassword = async(req,res)=>{
    try {
        
    } catch (error) {
        console.error("Error during login: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports ={ changePassword
}