const{Proker} =  require("../models/index");
const { where } = require("sequelize");


const lihatProker  = async(req,res)=>{
    try {
        const lihatProker = await Proker.findAll({});
        res.json(lihatProker)
    } catch (error) {
        console.error("Error during login: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports ={lihatProker}